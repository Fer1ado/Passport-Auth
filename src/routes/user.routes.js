import {Router} from "express"
import {
    register,
    login,
  } from "../Controller/user.controller.js";
import passport from "passport"


const userRouter = Router()

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
        if(err) return res.send(err)
        res.redirect("/login")
    })
})


/*--------------------------------GITHUB------------------------------*/
userRouter.get("/register-github", passport.authenticate("github",{scope:["user:email"]}))

userRouter.get("/github", passport.authenticate("github",{failureRedirect: '/loginError', successRedirect: "/user/profile", passReqToCallback: true, failureMessage: true}), async (req, res) => {
    res.redirect("/")
})

/*--------------------------------GOOGLE------------------------------*/
userRouter.get("/oauth2/redirect/accounts.google.com", passport.authenticate("google", {assignProperty: "user", successRedirect: "/user/profile", failureRedirect: "/loginError", passReqToCallback: true}), async (req, res) => {
    res.redirect("/user/profile")
})
userRouter.get("/register-google", passport.authenticate("google", {scope:["profile"]}))


export default userRouter;

