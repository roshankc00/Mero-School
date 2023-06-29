import  express from 'express'
import { forgetPassword, getASingleUser, getAllUser, loginUser, registerUser, resetPassword } from '../controllers/user.Controller'
const router=express.Router()



router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/:id",getASingleUser)
router.get('/',getAllUser)
router.put('/password/forget',forgetPassword)
router.put('/resetpassword/:token',resetPassword)

export default router 