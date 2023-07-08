import  express from 'express'
import upload from '../middlewares/multer.middleware'
import { createCourse, deleteCourse, getASingleCourse, getCourses } from '../controllers/courses.Controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';

const router=express.Router()


router.post('/',checkAuth,upload.array('file',12),createCourse)

router.delete('/:id',checkAuth,deleteCourse)
router.get('/',checkAuth,getCourses)
router.get('/:id',checkAuth,getASingleCourse)

export default router 