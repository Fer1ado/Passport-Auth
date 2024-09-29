import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import {userManager} from "../Controller/Manager/userManager.js"
import "dotenv/config"

/*------------------CON JWT BEARER EN HEADER-------------------*/

const strategyConfig= {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

const verifyToken = async (jwt_payload, done) => {
   // req.user = jwt_payload
   if (!jwt_payload) return done(null, false, {message: "User not found"});
   return done(null, jwt_payload)
}
passport.use("jwt", new jwtStrategy(strategyConfig, verifyToken))


/*------------------CON EXTRACTOR DE COOKIES-------------------*/

const cookieExtractor = (req) => {
    const token  = req.cookies.token
    return token
}

const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.SECRET_KEY
}

passport.use("jwtCookies", new jwtStrategy(strategyConfigCookies, verifyToken))



/*------------------SERIALIZE Y DESERIALIZE-------------------*/

passport.serializeUser((user, done) => {
    try {
        done(null, user.userId)
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