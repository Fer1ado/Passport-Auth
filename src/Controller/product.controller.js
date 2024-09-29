import { MongoProductManager } from "./Manager/productManager.js";

//pedido de productos por ID
export const getProductById = async (req, res, next) => {
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
}



// Busqueda de Products con paginate y filtro
export const getAllProducts =  async (req, res, next)=>{
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
}


//Subida de productos
export const addProduct = async (req, res, next) => {
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
};

export const populateDb =  async (req, res) => {
    const response = await MongoProductManager.addMany(req.body)
    res.status(200).send(response)   
};

//editado de producto
export const updateProductbyId = async (req, res, next) => {
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

};

//borrado de producto
export const deleteProductById = async (req, res, next) => {
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
};
