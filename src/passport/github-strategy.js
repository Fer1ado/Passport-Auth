import passport from "passport"
import { Strategy as GithubStrategy } from 'passport-github2';
import {userManager} from "../Controller/Manager/userManager.js"
import "dotenv/config";


const strategyConfig = {
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: "http://localhost:8080/users/github"
};

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {

    try {
        //console.log("🚀 ~ file: github-strategy.js:14 ~ registerOrLogin ~ profile:", profile);
        const email = profile._json.email !== null ? profile._json.email : profile._json.blog
        const userDb  = await userManager.existUser(email)
        if (userDb) return done(null, userDb)
        
        const newUser = {
            email: email,
            password: "github",
            first_name: profile._json.name.split(" ").shift(),
            last_name: profile._json.name.split(" ").pop(),
            role: "user",
        }
        //console.log("🚀 ~ file: github-strategy.js:30 ~ registerOrLogin ~ newUser:", newUser);
        const registerUser =  await userManager.createUser(newUser)
        return done(null, registerUser)

    } catch (error) {
        return done(null, error, {message: "error al procesar el alta de usuario"})
    }
}



passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));



passport.serializeUser((user, done) => {
    try {
        done(null, user)
    } catch (error) {
        return done(error)
    }
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userManager.getUserById(id)
        return done(null, user)
    } catch (error) {
        return done(null, error)
    }
})