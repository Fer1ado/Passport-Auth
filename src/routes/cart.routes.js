import { Router } from "express";
import * as controller from "../Controller/cart.controller.js"

const cartRoute = Router();

/// lista todos los carritos registrados en la BD
cartRoute.get("/", async(req, res, next)=>{ controller.listAllCarts(req, res, next) })

/// lista un carrito en particular por ID
cartRoute.get("/:cid", async(req, res, next)=>{ controller.getCartById(req, res, next) })

/// crea un nuevo carrito en la BD
cartRoute.post("/",async (req, res) => { controller.createCart(req,res) })

/// agrega un producto al carrito o actualiza cantidades de producto ya agregado
cartRoute.post("/:cid/product/:pid",async (req, res, next) => { controller.addAndUpdateCart(req,res,next) })

/// actualiza un carrito en la BD pero cargando varios productos y varias cantdiades via array en body
cartRoute.put("/:cid",async (req, res, next) => { controller.addAndUpdateCartViaArray(req,res,next) })

/// elimina un producto del carrito
cartRoute.delete("/:cid/product/:pid",async (req, res, next) => { controller.deleteProductInCartById(req,res,next) })

/// elimina un carrito completo de la BD por ID
cartRoute.delete("/:cid", async(req, res, next)=>{ controller.deleteCartById(req,res,next) })

export default cartRoute