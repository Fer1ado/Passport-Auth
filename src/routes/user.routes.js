import {Router} from "express"
import { userManager } from "../Controller/Manager/userManager.js"
import passport from "passport"

const userRouter = Router()

userRouter.post("/register", passport.authenticate("register"), async (req, res, next) => {
    try {
        const userfront = req.body

        const newUser = await userManager.createUser(req.body)
        //console.log("🚀 ~ file: user.routes.js:12 ~ userRouter.post ~ newUser:", newUser);

        if(newUser.message === "nuevo usuario creado"){
            req.session.newUser = "Usuario Creado con exito!"
            return res.redirect("/login")
        } if (newUser.message === "mail already exists"){
              req.session.user = newUser.existUser.email
              req.session.message = "mail already exists"
            return res.redirect("/loginError")
        } else {
            return res.redirect("/loginError")}
    } catch (error) {
        next(error)
    }
})

userRouter.post("/login", passport.authenticate("login"), async (req, res, next) => {
    const userLogin = req.body
    //console.log("🚀 ~ file: user.routes.js:28 ~ userRouter.post ~ userLogin:", userLogin);
    try {
        const userDb = await userManager.login(userLogin)

        console.log("🚀 ~ file: user.routes.js:31 ~ userRouter.post ~ user:", userDb);

        if(userDb.status === "success"){
                   /*  req.session.user = userDb.user.first_name + " " +userDb.user.last_name
                    req.session.email = userDb.user.email
                    req.session.role = userDb.user.role
                    req.session.password = userDb.user.password
                    req.session.loggedIn = true  */
                    console.log(req.session)
            res.redirect("/user/profile")
        } else { 

            res.redirect("/loginError")}
    } catch (error) {
        next(error)
    }
})

export default userRouter;

