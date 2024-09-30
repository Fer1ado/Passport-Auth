
import 'dotenv/config'
import mongoose from 'mongoose';
import handlebars from "express-handlebars";
import path from "path"
import {Server} from "socket.io"
import displayRoutes from 'express-routemap';
import { errorHandler } from './middleware/error.hander.middleware.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from "connect-mongo"
import passport from "passport"

//estrategias de Passport
import "./passport/local-strategy.js"
import "./passport/github-strategy.js"
import "./passport/google-strategy.js"
import "./passport/jwt-strategy.js"


//importación de rutas
import cartRoute from "./routes/cart.routes.js";
import prodRoute from "./routes/products.routes.js";
import viewsRoute from "./routes/views.routes.js";
import userRouter from './routes/user.routes.js';


/// CONFIG/IMPORT SERVIDOR
import express from "express";
import { _dirname } from "./utils.js";

const app = express()
const PORT = 8080;

//Config Express-Session
const hashCode = process.env.SECRET_KEY

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.DB_CNN || "mongodb://localhost:27017/coderhouse",
    ttl: 360, // se detalla en segundos
    crypto: {
      secret: hashCode
    }
  }),
  secret: hashCode,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1800 * 100 // se detalla en milisegundos (5min)
}}

/// CONEXION A MONGO DB
mongoose.connect(process.env.DB_CNN || "mongodb://localhost:27017/coderhouse")
    .then(() => console.log('Conectado a Mongo Exitosamente'))
    .catch(() => console.log('Error al conectarse a la base de datos'))


// MIDDLEWARES GLOBALES
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(session(sessionConfig)) // inicialización de Middleware global sessions
app.use(cookieParser()) // inicicalización de Middleware global coockies
app.use(passport.initialize()) // ---> inicialización de middleware global de passport
app.use(passport.session()) // ---> inicialización de middleware global de passport-session (enlaza passport con express-session)
app.use(errorHandler)  // incorporación de Middleware Global manejo de errores


// RUTAS ESTATICAS PARA VIEWS
app.use("/static", express.static(_dirname + "/public"))
app.use("/products", express.static(_dirname + "/public"))
app.use('/realtimeproducts', express.static(path.join(_dirname, '/public')))

// SETEO DE PUERTO
const httpserver = app.listen(PORT, ()=>{
  displayRoutes(app)
  console.log(`Server listening on port ${PORT}`)
})

// CONFIG HANDLEBARS
app.engine("handlebars", handlebars.engine())
app.set("views", path.resolve(_dirname, "./views"))
app.set("view engine", "handlebars")


//ROUTES
app.use("/api/products", prodRoute);
app.use("/api/cart", cartRoute)
app.use("/users", userRouter);
app.use("/", viewsRoute);


