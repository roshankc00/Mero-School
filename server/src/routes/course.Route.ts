import  express from 'express'
import upload from '../middlewares/multer.middleware'
import { createCourse, deleteCourse, editCourse, getASingleCourse, getCourses } from '../controllers/courses.Controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';

const router=express.Router()


router.post('/',checkAuth,upload.array('file',12),createCourse)
router.delete('/:id',checkAuth,deleteCourse)
router.get('/',checkAuth,getCourses)
router.get('/:id',checkAuth,getASingleCourse)
router.patch('/:id',checkAuth,editCourse)

export default router 