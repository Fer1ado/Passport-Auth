import {Router} from "express"
import { userManager } from "../Controller/Manager/userManager.js"
import passport from "passport"

const userRouter = Router()

userRouter.post("/register", passport.authenticate("register", { failureRedirect: '/loginError', failureMessage: true } ), async (req, res, next) => {
    try {
        req.session.loginMsg = "Usuario Creado con exito!"
        return res.redirect("/login")
    } catch (error) {
        next(error)
    }
})

userRouter.post("/login", passport.authenticate("login", { failureRedirect: '/loginError', failureMessage: true }), async (req, res, next) => {
    const userLogin = req.body
    //console.log("🚀 ~ file: user.routes.js:28 ~ userRouter.post ~ userLogin:", userLogin);
    try {
        const userDb = await userManager.login(userLogin)
        const token = await generateToken(userDb)
        //res.header("Authorization", token,{httpOnly: true}).json({msg:"login OK", token})
        res.cookie("Authorization", token,{httpOnly: true}).json({msg:"login OK", token})

        /* if(userDb.status === "success"){
                    req.session.user = userDb.user.first_name + " " +userDb.user.last_name
                    req.session.email = userDb.user.email
                    req.session.role = userDb.user.role
                    req.session.password = userDb.user.password
                    req.session.loggedIn = true 
                    //console.log(req.session)
            res.redirect("/user/profile")
        } else { 
            res.redirect("/loginError")} */

    } catch (error) {
        next(error)
    }
})

userRouter.get("/register-github", passport.authenticate("github",{scope:["user:email"]}))

userRouter.get("/github", passport.authenticate("github",{failureRedirect: '/loginError', successRedirect: "/user/profile", passReqToCallback: true, failureMessage: true}), async (req, res) => {
    res.redirect("/")
})

userRouter.get("/oauth2/redirect/accounts.google.com", passport.authenticate("google", {assignProperty: "user", successRedirect: "/user/profile", failureRedirect: "/loginError", passReqToCallback: true}), async (req, res) => {
    res.redirect("/user/profile")
})

userRouter.get("/register-google", passport.authenticate("google", {scope:["profile"]}))

userRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
        if(err) return res.send(err)
        res.redirect("/login")
    })
})

export default userRouter;

