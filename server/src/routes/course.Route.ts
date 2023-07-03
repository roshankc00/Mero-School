import  express from 'express'
import upload from '../middlewares/multer.middleware'
import { createCourse } from '../controllers/courses.Controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';

const router=express.Router()


router.post('/',checkAuth,checkRole('admin','instructor') as any,upload.single('photo'),createCourse)

export default router 