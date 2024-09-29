import {fileURLToPath} from "url"
import {dirname} from "path"
import jwt from "jsonwebtoken"
import "dotenv/config"

import {compare, genSalt, hash} from "bcrypt"

const _filename = fileURLToPath(import.meta.url)

export const _dirname = dirname(_filename) // devuelvo el path del archivo

/**
 * metodo que realiza hasheo de la contraseña via bcrypt
 * @param {*} password string (input password sin hash)
 * @returns string (output password Hasheada)
 */
export const createHash = async(password) => hash(password, await genSalt(10))


/**
 * metodo que realiza comparación de contraseña hasheada via bcrypt con pass provista por usuario
 * @param {*} password string (input password sin hash)
 * @param {*} user usuario existente en base de datos
 * @returns boolean (de a cuerdo si coincide password)
 */
export const isValidPassword = async (password, user) => compare(password, user.password)

console.log(_dirname)

export const generateToken = (user) => {
    const payload = {
        userId: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, SECRET_KEY, {expiresIn: "15m"})
}