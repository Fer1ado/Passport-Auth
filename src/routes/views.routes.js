import { Router } from "express";
import { MongoCartManager } from "../Controller/Manager/cartManager.js"
import {productModel} from "../Controller/models/product.model.js"
import { cartModel } from "../Controller/models/cart.model.js";


const viewsRoute = Router()


viewsRoute.get("/register", (req, res) => {
  res.render("A-register",{})
})

viewsRoute.get("/login", (req, res) => {
  const sessionInfo = req.session
  res.render("A-login",{sessionInfo})
})

viewsRoute.get("/user/profile", (req, res) => {
  const userDb = req.session
 // console.log("🚀 ~ file: views.routes.js:21 ~ viewsRoute.get ~ userDb:", userDb);
  res.render("A-profile",{userDb})
})

viewsRoute.get("/loginError", (req, res) => {
  res.render("A-loginError",{})
})

viewsRoute.get("/home", async (req, res)=> {
  const products = await manager.getProducts()
  res.render("home", {
    js: "rtprod.js",
    css: "style.css",
  })
})

// Vista de Productos con Socket.io
viewsRoute.get("/realtimeproducts", (req, res) => {
    res.render ("realtimeproducts", {
      js:"rtprod.js",
      css:"style.css"
    } )
  })  

  // vista de productos en handlebars con boton comprar
viewsRoute.get("/products", async (req, res) => {
    const { page = 1, limit = 20 , sort , filter = true} = req.query
    try {

    const sortTogle = (sort) =>{
      let srt = parseInt(sort)
      if(sort === undefined) return 1
      else { return srt *= -1 }
      }
  
      const sorting = sortTogle(sort)

      const response = await productModel.paginate({status: filter},{limit: limit, page: page, sort: {price: sorting}})

      if(page > response.totalPages){
        return res.json({status: "failed", message: "LA PAGINA SELECCIONADA NO EXISTE"})
      }
      
      const cart = await cartModel.create({})
     
      //Convierto la query de mongo a un objeto javascript plano para que lo pueda leer Handlebars
      const products = response.docs.map(doc =>  {return{
        id: doc._id,
        cart: cart._id,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        thumbnail: doc.thumbnail,
        price: doc.price,
        stock: doc.stock,
        code: doc.code
      }})

      //paso el objeto plano al view de handlebars
      res.render("products", {
          docs: products,
          page: response.page,
          sort: sorting,
          nextPage: response.nextPage,
          prevPage: response.prevPage,
          totalPages: response.totalPages,
          hasPrevPage: response.hasPrevPage,
          hasNextPage: response.hasNextPage,
          prevLink: `?page=${response.prevPage}`,
          nextLink: `?page=${response.nextPage}`,
      })
      

    } catch (error) {
      return res.status(400).json({status: "failed", error: error.message})
    }
});

//Vista de carrito interactiva con productos
viewsRoute.post("/products/api/cart/:cid/product/:pid", async (req, res) => {
    try {
      const pid = req.params.pid;
      const cid = req.params.cid
      const response = await MongoCartManager.addAndUpdateCart(cid,pid, 1)
      const cart = await cartModel.find({_id : cid}).populate("products.product",{title: 1, price: 1,stock:1, code: 1, description:1});
      
      //convierto ojbjeto mongoose a javascript plano
      const cartUp = cart[0].products.map(item => {
        return{
          id: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          title: item.product.title,
          description: item.product.description,          
          }
      })

      res.render("cart", {
        cart: cid,
        item: cartUp,
        deleteBtn: "btn btn-outline-primary disabled"
      })
      
    } catch (error) {
      return res.status(400).json({status: "failed", error: error.message})
    }
})

viewsRoute.get("/products/api/cart/:cid/product/delete/:pid", async (req, res) => {
    try {
      const pid = req.params.pid;
      const cid = req.params.cid
      const response = await MongoCartManager.deleteProductById(cid,pid, 1)
      const cart = await cartModel.find({_id : cid}).populate("products.product",{title: 1, price: 1,stock:1, code: 1, description:1});
      
      //convierto ojbjeto mongoose a javascript plano
      const cartDel = cart[0].products.map(item => {
        return{
          id: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
          title: item.product.title,
          description: item.product.description,
          }
      })

      //console.log(`Item que se esta eliminando ${cartDel}`)

      res.render("cart", {
        cart: cid,
        item: cartDel,
        
      })
      
    } catch (error) {
      return res.status(400).json({status: "failed", error: error.message})
    }
})

//Vista de carrito con ruta GET
viewsRoute.get("/cart/:cid", async (req, res) => {
    try {
      const cid = req.params.cid
      const cart = await cartModel.find({_id : cid}).populate("products.product",{title: 1, price: 1,stock:1, code: 1, description:1});

        //convierto ojbjeto mongoose a javascript plano
        const cartUp = cart[0].products.map(item => {
          return{
            id: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            title: item.product.title,
            description: item.product.description,
            }
        })
      
      res.render("cart", {
        cart: cid,
        item: cartUp,
      })

    } catch(error){
      return res.status(400).json({status: "failed", error: error.message})}
}) 


    
export default viewsRoute;

