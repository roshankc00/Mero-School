import  express from 'express'
import upload from '../middlewares/multer.middleware'
import { createCourse } from '../controllers/courses.Controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import { createLecture, getASingleLecture, getAllLectures } from '../controllers/lecture.controller';

const router=express.Router()


router.post('/',checkAuth,upload.single('file'),createLecture)
router.get('/:id',getASingleLecture)
router.get('/',getAllLectures)

export default router 