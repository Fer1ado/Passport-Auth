import { MongoProductManager } from "../Controller/Manager/productManager.js";
import { Router } from "express";
import { productModel } from "../Controller/models/product.model.js";

const prodRoute = Router();


//pedido de productos por ID
prodRoute.get("/:pid", async (req, res, next) => {
  const pid = req.params.pid;
  const response = await MongoProductManager.getProductById(pid)
  
    try{
      if(response.status === "success"){
        res.status(200).send(response)
      } if(response.status === "failed"){
        res.status(404).send(response)   
      } 
    } catch(error){
        next(error)
    }
});

// Busqueda de Products con paginate y filtro
prodRoute.get("/", async (req, res, next)=>{
  const { limit = 3 , page = 1, filter = true, sort = "1" } = req.query;
  const response = await MongoProductManager.getProducts(limit,page,filter,sort)

    try{
      if(response.status === "success"){
        res.status(200).send(response)
      } if(response.status === "failed"){
        res.status(404).send(response)   
      } 
    } catch(error){
        next(error)
      }
})


//Subida de productos
prodRoute.post("/", async (req, res, next) => {
  const response = await MongoProductManager.addProduct(req.body)

  try{
    if(response.status === "success"){
      res.status(200).send(response)
    } if(response.status === "failed"){
      res.status(404).send(response)   
    } 
  } catch(error){
      next(error)
  }
});

prodRoute.post("/many", async (req, res) => {
  const response = await MongoProductManager.addMany(req.body)
  res.status(200).send(response)   
});

//editado de producto
prodRoute.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await MongoProductManager.updateProduct(id, req.body)

  try{
    if(response.status === "success"){
      res.status(200).send(response)
    } if(response.status === "failed"){
      res.status(404).send(response)   
    } 
  } catch(error){
      next(error)
  }

});

//borrado de producto
prodRoute.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const response = await MongoProductManager.deleteProduct(id)
  
  try{
    if(response.status === "success"){
      res.status(200).send(response)
    } if(response.status === "failed"){
      res.status(404).send(response)   
    } 
  } catch(error){
      next(error)
  }
});

export default prodRoute;
