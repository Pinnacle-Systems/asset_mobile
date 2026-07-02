import bcrypt from 'bcrypt'
import { env } from '../config/env.js'

const saltRounds = 10
const hashedPassword = bcrypt.hashSync(env.ADMIN_SEED_PASSWORD, saltRounds)
console.log(hashedPassword)
