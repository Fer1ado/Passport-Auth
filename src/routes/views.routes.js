import { Router } from "express";
import { passportCall } from "../middleware/passportCall.middleware.js";
import * as controller from "../Controller/views.controller.js"

const viewsRoute = Router()

viewsRoute.get("/register", (req, res) => {
  res.render("A-register",{})
})

viewsRoute.get("/login", (req, res) => {
  const sessionInfo = req.session.messages
  res.render("A-login",{sessionInfo})
})

viewsRoute.get("/user/profile", passportCall('jwtCookies'), (req, res) => {
  const userSession = req.session
  console.log("🚀 ~ file: views.routes.js:21 ~ viewsRoute.get ~ userDb:", userSession);
  res.render("A-profile",{userSession})
})

viewsRoute.get("/loginError", (req, res) => {
  const failureMessage = req.session.messages
  res.render("A-loginError",{failureMessage})
})

viewsRoute.get("/home", async (req, res)=> {
  res.render("home", {
    js: "rtprod.js",
    css: "style.css",
  })
})

// Vista de Productos con Socket.io
viewsRoute.get("/realtimeproducts",  (req, res) => {
    res.render ("realtimeproducts", {
      js:"rtprod.js",
      css:"style.css"
    } )
})  

// vista de productos en handlebars simula vista private
viewsRoute.get("/products", passportCall('jwtCookies'), async (req, res, next) => { controller.vistaProducts(req,res,next)
});

//Vista de carrito interactiva con productos
viewsRoute.post("/products/api/cart/:cid/product/:pid", passportCall('jwtCookies'), async (req, res,next) => { controller.vistaCart(req,res,next) })

//Vista de carrito con ruta GET
viewsRoute.get("/products/api/cart/:cid/product/delete/:pid", passportCall('jwtCookies'), async (req, res, next) => { controller.vistaDeleteCart(req, res, next) })

//Vista de carrito con id
viewsRoute.get("/cart/:cid", async (req, res, next) => { controller.vistaCartId(req, res, next) }) 


export default viewsRoute;

