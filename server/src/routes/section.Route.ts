import  express from 'express'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import { createSection, getASinglesection, getAllSections } from '../controllers/section.Controller';

const router=express.Router()


router.post('/',checkAuth,createSection)
router.get('/',getAllSections)
router.get('/:id',getASinglesection)


export default router 