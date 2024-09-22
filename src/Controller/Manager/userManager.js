import { userModel } from "../models/user.model.js"
import  {isValidPassword, createHash } from "../../utils.js"

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

            if(!existUser){
                //console.log("🚀 ~ file: userManager.js:24 ~ UserDao ~ createUser ~ existUser: creando user", existUser);
                const password = await createHash(user.password)
                const userDb = {...user, password:password}
                const newUser = await userModel.create(userDb)
                //console.log("🚀 ~ file: userManager.js:27 ~ UserDao ~ createUser ~ userDb:", userDb);
                return {status: "success", message: "nuevo usuario creado", newUser} 

            } else {
                console.log("usuario existente")
                return {status: "failed", message: "mail already exists", existUser} }
            }
        catch (error) {
            //console.log("🚀 ~ file: userManager.js:36 ~ UserDao ~ ESTA ENTRANDO ERROR DE CATCH", error);
            return { status: "failed", message: error.msg }
        }
    }


    async login(userLogin) {
        try {
            const user = await userModel.findOne({ email: userLogin.email })
            
            if (!user) {
                req.session.user = userLogin.email
                return { status: "failed", message: "USUARIO NO ENCONTRADO" }
            }
            else {
                const passValid = await isValidPassword(userLogin.password, user)
                //console.log("🚀 ~ file: userManager.js:53 ~ UserDao ~ login ~ passValid:", passValid);
                
                if(passValid === false){
                    return {status: "failed", message: "Contraseña incorrecta"}
                } else {
                //console.log("usuario logueado", user)
                    return { status: "success", message: "USUARIO LOGUEADO", user}
                }
            }
        } catch (error) {
            console.log("esta entrando este error?")
            return { status: "failed", message: error.msg }
        }
    }


}

export const userManager = new UserDao()