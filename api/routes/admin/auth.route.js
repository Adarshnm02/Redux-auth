import express from 'express';
import { adminSignin, adminSignout} from '../../controllers/auth.controller.js';
import { deleteUser, userDetails, searchUser } from '../../controllers/admin.controller.js';

const router = express.Router()


console.log("From auth.controller.js");

router.post('/admin', adminSignin)
router.get('/admin-home')
router.get('/admin-signout', adminSignout)
router.get('/userDetails', userDetails)
// render.get('/userDetails/:id', userDetails)
router.delete('/deleteUser/:id', deleteUser)
router.post('/search', searchUser)



export default router