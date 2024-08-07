import express from 'express';
import { adminSignin } from '../../controllers/auth.controller.js';

const router = express.Router()


console.log("From auth.controller.js");

router.post('/admin', adminSignin)
router.get('/adminDash')



export default router