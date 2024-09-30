import { Router } from "express";
import * as controller from "../Controller/cart.controller.js"

const cartRoute = Router();

/// lista todos los carritos registrados en la BD
cartRoute.get("/", controller.listAllCarts)

/// lista un carrito en particular por ID
cartRoute.get("/:cid", controller.getCartById)

/// crea un nuevo carrito en la BD
cartRoute.post("/", controller.createCart)

/// agrega un producto al carrito o actualiza cantidades de producto ya agregado
cartRoute.post("/:cid/product/:pid", controller.addAndUpdateCart)

/// actualiza un carrito en la BD pero cargando varios productos y varias cantdiades via array en body
cartRoute.put("/:cid", controller.addAndUpdateCartViaArray)

/// elimina un producto del carrito
cartRoute.delete("/:cid/product/:pid", controller.deleteProductInCartById)

/// elimina un carrito completo de la BD por ID
cartRoute.delete("/:cid", controller.deleteCartById)

export default cartRoute