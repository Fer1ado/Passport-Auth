export const isAuth = (req, res, next) => {
    //console.log(req.session.passport)
    console.log({User_Authentication: req.isAuthenticated()})
  
    if (req.isAuthenticated()) return next()
    req.session.loginMsg = "necesitas loguearte para seguir navegando"
    res.redirect("/Login")

}