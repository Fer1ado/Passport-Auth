import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local';
import {userManager} from "../Controller/Manager/userManager.js"


const strategyConfig = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
};

const singup = async (req, email, password, done) => {
    try {
        const user = await userManager.existUser(email)
        if (user) {
            return done(null, false, {message: "User already exists"})
        } else{
            const newUser = await userManager.createUser(req.body)
            return done(null, newUser)
        }

    } catch (error) {
        return done(error)
    }
}

const login = async(req, email, password, done) => {
    try {
        const user = req.body
        const userLogin = await userManager.login(user)
        //console.log("🚀 ~ file: local-strategy.js:31 ~ login ~ userLogin:", userLogin);
        
        if (userLogin.status === "failed" || !userLogin){
            return done(null, false, {message: "Invalid Credentials"})
        } else{
            console.log(userLogin.user._id)
            return done(null, userLogin.user)
        }

    } catch (error) {
        return done(error)
    }
}

const loginStrategy = new LocalStrategy(strategyConfig, login)
const singUpStrategy = new LocalStrategy(strategyConfig, singup)

passport.use("login", loginStrategy)
passport.use("register", singUpStrategy)


passport.serializeUser = (async (user, done) => {
    try {
        const bla = await userManager.getUserById(user._id)
        console.log(bla)
        done(null, user._id)
    } catch (error) {
        return done(error)
    }
})

passport.deserializeUser = (async (id, done) => {
    try {
        const user = await userManager.getUserById(id)
        return done(null, user)
    } catch (error) {
        return done(error)
    }
})