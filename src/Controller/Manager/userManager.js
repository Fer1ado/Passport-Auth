import { userModel } from "../models/user.model.js"
import  {isValidPassword, createHash, generateToken } from "../../utils.js"
import { MongoCartManager } from "./cartManager.js"

class UserDao {

    async existUser(email){
        try {
            const finduser = await userModel.findOne({email:email})
            //console.log("🚀 ~ file: userManager.js:8 ~ UserDao ~ existUser ~ finduser:", finduser);
            return finduser
        } catch (error) {
            return { status: "failed", message: error.msg } 
        }
    }

    async getUserById(id){
        try {
            const finduser = await userModel.findById({id})
            //console.log("🚀 ~ file: userManager.js:8 ~ UserDao ~ existUser ~ finduser:", finduser);
            return finduser
        } catch (error) {
            return { status: "failed", message: error.msg } 
        }
    }

    async createUser(user) {
        
        try {
            const existUser = await this.existUser(user.email)
            //console.log("🚀 ~ file: userManager.js:32 ~ UserDao ~ createUser ~ existUser:", existUser);

            if(!existUser){
                //console.log("🚀 ~ file: userManager.js:24 ~ UserDao ~ createUser ~ existUser: creando user", existUser);
                const password = await createHash(user.password)
                const userDb = {...user, password:password}
                const newUser = await userModel.create(userDb)
                //console.log("🚀 ~ file: userManager.js:27 ~ UserDao ~ createUser ~ userDb:", userDb);
                return {status: "success", message: "nuevo usuario creado", newUser} 
            } else {
                return {status: "failed", message: "EL CORREO YA EXISTE", existUser} }
            }
        catch (error) {
            //console.log("🚀 ~ file: userManager.js:36 ~ UserDao ~ ESTA ENTRANDO ERROR DE CATCH", error);
            return { status: "failed", message: error}
        }
    }


    async login(userLogin) {

        
        try {
            const user = await userModel.findOne({ email: userLogin.email }) 
            //console.log("🚀 ~ file: userManager.js:53 ~ UserDao ~ login ~ user:", user);
            
            if (!user) {
                return { status: "failed", message: "USUARIO NO ENCONTRADO" }
            }
            else {
                const passValid = await isValidPassword(userLogin.password, user)
                //console.log("🚀 ~ file: userManager.js:53 ~ UserDao ~ login ~ passValid:", passValid);
                
                if(passValid === false){
                    return {status: "failed", message: "CONTRASEÑA INCORRECTA"}
                } else {
                
                const createCart = await MongoCartManager.createCart()
                const cartObject = createCart.cart._id.toString()   
                user.cart = cartObject
                const token = generateToken(user)
                
                return {user: user, token: token}
                }
            }
        } catch (error) {
            console.log("esta entrando este error?")
            return { status: "failed", message: error }
        }
    }

}

export const userManager = new UserDao()