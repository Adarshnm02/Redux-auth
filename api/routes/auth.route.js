import express from 'express'
import { signup } from '../controllers/auth.controller.js';


const rooter = express.Router()

rooter.post('/signup', signup)

export default rooter; 