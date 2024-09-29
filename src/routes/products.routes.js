import { Router } from "express";
import * as controller from "../Controller/product.controller.js"

const prodRoute = Router();


//pedido de productos por ID
prodRoute.get("/:pid", (req, res, next) => { controller.getProductById(req,res,next) });

// Busqueda de Products con paginate y filtro
prodRoute.get("/", async (req, res, next)=>{ controller.getAllProducts(req,res,next)})

//Subida de productos
prodRoute.post("/", async (req, res, next) => { controller.addProduct(req, res, next) });

//editado de producto
prodRoute.put("/:id", async (req, res, next) => { controller.updateProductbyId(req,res.next) });

//borrado de producto
prodRoute.delete("/:id", async (req, res, next) => { controller.deleteProductById(req, res.next) });

//////////// **** comando de inicializacion de db
prodRoute.post("/many", async (req, res) => { controller.populateDb(req,res) });


export default prodRoute;
