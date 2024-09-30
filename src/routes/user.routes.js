import {Router} from "express"
import * as controller from "../Controller/user.controller.js";


const userRouter = Router()

userRouter.post("/register", controller.register);

userRouter.post("/login", controller.login);

userRouter.post("/logout", controller.logout)

/*--------------------------------GITHUB------------------------------*/
userRouter.get("/register-github", controller.githubReg)

userRouter.get("/github", controller.githubAuth)

/*--------------------------------GOOGLE------------------------------*/
userRouter.get("/oauth2/redirect/accounts.google.com", controller.googleAuth)
userRouter.get("/register-google", controller.googleReg)


export default userRouter;

