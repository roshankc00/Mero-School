import  express from 'express'
import upload from '../middlewares/multer.middleware'
import { createCourse } from '../controllers/courses.Controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';

const router=express.Router()


router.post('/',checkAuth,upload.array('photo',12),createCourse)

export default router 