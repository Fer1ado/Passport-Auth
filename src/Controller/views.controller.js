import { MongoCartManager } from "../Controller/Manager/cartManager.js"
import { productModel } from "../Controller/models/product.model.js"
import { cartModel } from "../Controller/models/cart.model.js";


export const register = async (req, res) => { res.render("A-register", {}) }

export const login = async (req, res) => {
    const sessionInfo = req.session.messages
    res.render("A-login", { sessionInfo })
}

export const profile = async (req, res) => {
    const userSession = req.session
    res.render("A-profile", { userSession })
}

export const loginError = async (req, res) => {
    const failureMessage = req.session.messages
    res.render("A-loginError", { failureMessage })
}

export const realtimeproducts = async (req, res) => {
    res.render("realtimeproducts", {
        js: "rtprod.js",
        css: "style.css"
    })
}


// vista de productos en handlebars con boton comprar
export const vistaProducts = async (req, res) => {
    const { page = 1, limit = 20, sort, filter = true } = req.query
    try {

        const sortTogle = (sort) => {
            let srt = parseInt(sort)
            if (sort === undefined) return 1
            else { return srt *= -1 }
        }

        const sorting = sortTogle(sort)
        const response = await productModel.paginate({ status: filter }, { limit: limit, page: page, sort: { price: sorting } })
        if (page > response.totalPages) {
            return res.json({ status: "failed", message: "LA PAGINA SELECCIONADA NO EXISTE" })
        }
        const cart = req.session.user.cart


        //Convierto la query de mongo a un objeto javascript plano para que lo pueda leer Handlebars
        const products = response.docs.map(doc => {
            return {
                id: doc._id,
                cart: cart,
                title: doc.title,
                description: doc.description,
                category: doc.category,
                thumbnail: doc.thumbnail,
                price: doc.price,
                stock: doc.stock,
                code: doc.code
            }
        })

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
        return res.status(400).json({ status: "failed", error: error.message })
    }
}

//Vista de carrito interactiva con productos
export const vistaCart = async (req, res) => {
    try {
        const pid = req.params.pid;
        const cid = req.session.user.cart
        const response = await MongoCartManager.addAndUpdateCart(cid, pid, 1)
        const cart = await cartModel.find({ _id: cid }).populate("products.product", { title: 1, price: 1, stock: 1, code: 1, description: 1 });

        //convierto ojbjeto mongoose a javascript plano
        const cartUp = cart[0].products.map(item => {
            return {
                id: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
                title: item.product.title,
                description: item.product.description,
                cid: cid,
            }
        })

        res.redirect(`/products/api/cart/${cid}`)

    } catch (error) {
        return res.status(400).json({ status: "failed", error: error.message })
    }
}


export const vistaDeleteItem = async (req, res) => {
    const pid = req.params.pid;
    const cid = req.session.user.cart

    try {
        const response = await MongoCartManager.deleteProductById(cid, pid, 1)
        //console.log("🚀 ~ file: views.controller.js:132 ~ vistaDeleteCart ~ response:", response);

        const cart = await cartModel.find({ _id: cid }).populate("products.product", { title: 1, price: 1, stock: 1, code: 1, description: 1 });
        if (!cart) {
            return res.render("cart", {
                cart: cid,
                item: cartDel,
            })
        }
        //convierto ojbjeto mongoose a javascript plano
        const cartDel = cart[0].products.map(item => {
            return {
                id: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
                title: item.product.title,
                description: item.product.description,
                cart: cid
            }
        })
        res.render("cart", {
            cart: cid,
            item: cartDel,
        })

    } catch (error) {
        return res.status(400).json({ status: "failed", error: error.message })
    }
}

export const vistaDeleteCart = async (req, res) => {
    const cid = req.session.user.cart
    console.log("INICIA LA VISTA DELETECART")
    try {
        const response = await MongoCartManager.deleteCart(cid)
        const newCart = await MongoCartManager.createCart()
        req.session.user.cart = newCart.cart._id.toString()
        
        //console.log(`Item que se esta eliminando ${cartDel}`)
        res.render("cart", {
            cart: cid,
        })
    } catch (error) {
        return res.status(400).json({ status: "failed", error: error.message })
    }

}

//Vista de carrito con ruta GET
export const vistaCartId = async (req, res) => {
    try {
        const cid = req.session.user.cart
        const cart = await cartModel.find({ _id: cid }).populate("products.product", { title: 1, price: 1, stock: 1, code: 1, description: 1 });

        //convierto ojbjeto mongoose a javascript plano
        const cartDel = cart[0].products.map(item => {
            return {
                id: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
                title: item.product.title,
                description: item.product.description,
                cart: cid
            }
        })

        res.render("cart", {
            cart: cid,
            item: cartDel,
        })

    } catch (error) {
        return res.status(400).json({ status: "failed", error: error.message })
    }
}

