import { Router } from "express";
import * as controller from "../Controller/product.controller.js"

const prodRoute = Router();


//pedido de productos por ID
prodRoute.get("/:pid", controller.getProductById);

// Busqueda de Products con paginate y filtro
prodRoute.get("/",  controller.getAllProducts)

//Subida de productos
prodRoute.post("/", controller.addProduct);

//editado de producto
prodRoute.put("/:id", controller.updateProductbyId);

//borrado de producto
prodRoute.delete("/:id", controller.deleteProductById);

//////////// **** comando de inicializacion de db
prodRoute.post("/many", controller.populateDb);


export default prodRoute;
