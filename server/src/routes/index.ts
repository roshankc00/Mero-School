import express,{Request,Response} from 'express'
import authRoute from './auth.routes'
import userRoute from './user.route'
const router=express.Router()
 

router.use('/auth',authRoute)
router.use('/api/v1/user',userRoute)


export default router;



// ma frontendd garcu bhnara aasah nagara la 