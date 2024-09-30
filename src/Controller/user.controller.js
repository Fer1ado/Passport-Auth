
import { userManager } from "./Manager/userManager.js"; 
import passport from "passport";

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

export const logout = async (req, res, next) => {
    try {
         //console.log(req.session)
        req.logout((err) => {
            if(err) return res.send(err)
            res.redirect("/login")
        //console.log(req.session)
        })
    } catch (error) {
        next(error);
    }
}


export const githubReg = ()=>{ passport.authenticate("github",{scope:["user:email"]})}
export const githubAuth = ()=>{ passport.authenticate("github",{failureRedirect: '/loginError', successRedirect: "/user/profile", passReqToCallback: true, failureMessage: true}), async (req, res) => {res.redirect("/")}}


export const googleReg = () =>{ passport.authenticate("google", {scope:["profile"]})}
export const googleAuth = ()=>{ passport.authenticate("google", {assignProperty: "user", successRedirect: "/user/profile", failureRedirect: "/loginError", passReqToCallback: true}), async (req, res) => {res.redirect("/user/profile")}}