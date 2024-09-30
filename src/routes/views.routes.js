import { Router } from "express";
import { passportCall } from "../middleware/passportCall.middleware.js";
import * as controller from "../Controller/views.controller.js"

const viewsRoute = Router()


/*--------------------------------VISTAS PUBLIC------------------------------*/

viewsRoute.get("/register", controller.register)

viewsRoute.get("/login", controller.login)

viewsRoute.get("/loginError", controller.loginError)

/*--------------------------------VISTAS PRIVATE------------------------------*/
// vista de perfil de usuario con display de token
viewsRoute.get("/user/profile", passportCall('jwtCookies'), controller.profile)

// vista de productos en handlebars 
viewsRoute.get("/products", passportCall('jwtCookies'), controller.vistaProducts);

//Vista de carrito interactiva con productos
viewsRoute.post("/products/api/cart/:cid/product/:pid", passportCall('jwtCookies'), controller.vistaCart)

//Vista de carrito con ruta GET
viewsRoute.get("/products/api/cart/:cid/product/delete/:pid", passportCall('jwtCookies'), controller.vistaDeleteItem)

//Vista borrado carro completo
viewsRoute.post("/products/api/cart/delete/:cid", passportCall('jwtCookies'), controller.vistaDeleteCart)

//Vista de carrito con id
viewsRoute.get("/products/api/cart/:cid", passportCall('jwtCookies'), controller.vistaCartId) 


export default viewsRoute;

