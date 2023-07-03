import express,{Request,Response} from 'express'
import authRoute from './auth.Route'
import userRoute from './user.route'
import courseRoute from './course.Route'
import lectureRoute from './lecture.Route'
import sectionRoute from './section.Route'
import { checkAuth } from '../middlewares/authMiddleware'

const router=express.Router()
 

router.use('/auth',authRoute)
router.use('/api/v1/user',userRoute)
router.use('/api/v1/course',checkAuth,courseRoute)
router.use('/api/v1/section',checkAuth,sectionRoute)
router.use('/api/v1/lecture',checkAuth,lectureRoute)


export default router;



// ma frontendd garcu bhnara aasah nagara la 