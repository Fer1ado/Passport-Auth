import passport from "passport"

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if(err){
                return next(err)
            }if(!user){
                req.session.messages = "Tu sesion expiró, necesitas loguearte para poder navegar"
                return res.redirect("/Login")
            }
            req.user = user
            next()
        })(req,res,next)
    }
}