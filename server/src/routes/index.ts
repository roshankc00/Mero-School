import express,{Request,Response} from 'express'
import authRoute from './auth.Route'
import userRoute from './user.route'
import courseRoute from './course.Route'
const router=express.Router()
 

router.use('/auth',authRoute)
router.use('/api/v1/user',userRoute)
router.use('/api/v1/course',courseRoute)


export default router;



// ma frontendd garcu bhnara aasah nagara la 