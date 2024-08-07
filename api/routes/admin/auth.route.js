import express from 'express';
import { adminSignin, adminSignout} from '../../controllers/auth.controller.js';
import { deleteUser, userDetails, searchUser, userSelectedToEdit, updateUser } from '../../controllers/admin.controller.js';

const router = express.Router()


console.log("From auth.controller.js");

router.post('/admin', adminSignin)
router.get('/admin-home')
router.get('/admin-signout', adminSignout)
router.get('/userDetails', userDetails)
router.delete('/deleteUser/:id', deleteUser)
router.post('/search', searchUser)
router.get('/userForEdit/:id', userSelectedToEdit)
router.post('/admin-updateUser/:id', updateUser)



export default router