
import { userManager } from "./Manager/userManager.js"; 

export const register = async (req, res, next) => {
    try {
        const response = await userManager.createUser(req.body);
        if (response.status === "failed"){
            req.session.messages = response.message
            res.redirect("/loginError")
        } else 
        req.session.messages = response.message
        res.redirect("/login");
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const response = await userManager.login(req.body);
            if(response.status === "failed"){ 
            req.session.messages = response.message
            res.redirect("/loginError")}
            else {
        req.session.cookie.token = response.token;
        req.session.user = response.user
        req.session.token = response.token
        res.cookie('token', response.token, { httpOnly: true }).redirect("/user/profile")
        }
    } catch (error) {
        next(error);
    }
};

export const profile = async (req, res, next) => {
    try {
        const { first_name, last_name, email } = req.user;
        res.json({first_name, last_name, email});
    } catch (error) {
        next(error);
    } 
};



