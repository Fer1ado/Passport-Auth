// npm i passport-google-oauth20 (la libreria que usamos
//http://localhost:8080/users/oauth2/redirect/accounts.google.com)

import passport from "passport"
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {userManager} from "../Controller/Manager/userManager.js"
import "dotenv/config";


const strategyConfig = {
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: "/users/oauth2/redirect/accounts.google.com",
    scope: ["profile", "email"],
    state: true
};

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {

    try {
        console.log("🚀 ~ file: github-strategy.js:14 ~ registerOrLogin ~ profile:", profile);
        //console.log(profile._json.email)

        const email = profile._json.email
        const userDb  = await userManager.existUser(email)
        if (userDb) return done(null, userDb)
        
        const newUser = {
            email: email,
            password: "google",
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            role: "user",
            avatar: profile._json.picture,
            isGoogle: true
        }

        //console.log("🚀 ~ file: github-strategy.js:30 ~ registerOrLogin ~ newUser:", newUser);

        const registerUser =  await userManager.createUser(newUser)
        
        return done(null, registerUser)

    } catch (error) {
        return done(null, error, {message: "error al procesar el alta de usuario"})
    }
}


passport.use("google", new GoogleStrategy(strategyConfig, registerOrLogin));


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