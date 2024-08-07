import express from 'express';
import { adminSignin, adminSignout } from '../../controllers/auth.controller.js';

const router = express.Router()


console.log("From auth.controller.js");

router.post('/admin', adminSignin)
router.get('/admin-home')
router.get('/admin-signout', adminSignout)



export default router