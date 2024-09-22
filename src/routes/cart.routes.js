import { Router } from "express";
import { MongoCartManager } from "../Controller/Manager/cartManager.js";

const cartRoute = Router();


cartRoute.get("/:cid", async(req, res, next)=>{
    const cid = req.params.cid
    const response = await MongoCartManager.getCarrito(cid)

    try {
        if(response.status === "success"){
            res.status(200).send(response)
        } if(response.status === "failed"){
            res.status(404).send(response)   
        }} 
    catch (error) {
    next(error)
    }
})

cartRoute.get("/", async(req, res, next)=>{
    const cid = req.params.cid
    const response = await MongoCartManager.findAll(cid)
    
    try {
        if(response.status === "success"){
            res.status(200).send(response)
        } if(response.status === "failed"){
            res.status(404).send(response)   
    }} 
    catch (error) {
    next(error)
    }
})

cartRoute.post("/",async (req, res) => {
    const response = res.status(201).send(await MongoCartManager.createCart());

    if(response.status === "success"){
        res.status(201).send(response)
      } else{res.status(500).send(response)
    }
})


cartRoute.post("/:cid/product/:pid",async (req, res, next) => {
    const pid = req.params.pid;
    const cid = req.params.cid
    const quantity = req.body.quantity;
    const response = await MongoCartManager.addAndUpdateCart(cid,pid, quantity)

    try{
        if(response.status === "success"){
        res.status(201).send(response)
        } if(response.status === "failed"){
        res.status(404).send(response)
        }} 
    catch(error){
    next(error)
    }

})

cartRoute.put("/:cid/product/:pid",async (req, res, next) => {
    const pid = req.params.pid;
    const cid = req.params.cid
    const quantity = req.body.quantity;
    const response = await MongoCartManager.addAndUpdateCart(cid,pid, quantity)

    try{
        if(response.status === "success"){
            res.status(201).send(response)
        } if(response.status === "failed"){
            res.status(404).send(response)
        }} 
    catch(error){
    next(error)
    }
})

cartRoute.delete("/:cid/product/:pid",async (req, res, next) => {
    const pid = req.params.pid;
    const cid = req.params.cid
    const quantity = req.body.quantity;
    const response = await MongoCartManager.deleteProductById(cid,pid, quantity)

    try{
        if(response.status === "success"){
            res.status(200).send(response)
        } if(response.status === "failed"){
            res.status(404).send(response)
        }} 
    catch(error){
    next(error)
    }
})

cartRoute.put("/:cid",async (req, res, next) => {
    const cid = req.params.cid
    const array = req.body;
    const response = await MongoCartManager.updateCartWithProducts(cid,array)

    try{
        if(response.status === "success"){
            res.status(200).send(response)
        } if(response.status === "failed"){
            res.status(404).send(response)
        }} 
    catch(error){
    next(error)
    }
})


cartRoute.delete("/:cid", async(req, res, next)=>{
    const cid = req.params.cid
    response = await MongoCartManager.deleteCart(cid)
    
    try{
        if(response.status === "success"){
            res.status(200).send(response)
        } if(response.status === "failed"){
            res.status(404).send(response)
        }} 
    catch(error){
    next(error)
    }
})


export default cartRoute