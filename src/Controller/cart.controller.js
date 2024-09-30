import { MongoCartManager } from "../Controller/Manager/cartManager.js";

export const getCartById =  async(req, res, next)=>{
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
}

export const listAllCarts = async(req, res, next)=>{
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
}

export const createCart = async (req, res, next) => {
    const response = res.status(201).send(await MongoCartManager.createCart());
        if(response.status === "success"){
            res.status(201).send(response)
        } else{res.status(500).send(response)
        }
}

export const addAndUpdateCart = async (req, res, next) => {
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
}

export const addAndUpdateCartViaArray = async (req, res, next) => {
    const cid = req.params.cid
    const products = req.body
    const response = await MongoCartManager.updateCartWithProducts(cid, products)
        try{
            if(response.status === "success"){
                res.status(201).send(response)
            } if(response.status === "failed"){
                res.status(404).send(response)
            }} 
        catch(error){
        next(error)
        }
}

export const deleteProductInCartById = async (req, res, next) => {
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
}

export const deleteCartById = async(req, res, next)=>{
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
}

