import  express from 'express'
import upload from '../middlewares/multer.middleware'
import { createCourse } from '../controllers/courses.Controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import { createLecture, deleteLecture, editLecture, getASingleLecture, getAllLectures } from '../controllers/lecture.controller';

const router=express.Router()


router.post('/',checkAuth,upload.single('file'),createLecture)
router.get('/:id',checkAuth,getASingleLecture)
router.delete('/:id',checkAuth,deleteLecture)
router.get('/',checkAuth,getAllLectures)
router.patch('/:id',checkAuth,upload.single('file'),editLecture)

export default router 