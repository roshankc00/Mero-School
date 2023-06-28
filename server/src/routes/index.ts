import express,{Request,Response} from 'express'
import passport from '../middlewares/passport.middleware';
import env from '../utils/validateEnv'

const router=express.Router()


router.get('/auth/google',passport.authenticate('google'));

router.get('login/failed',(req:Request,res:Response)=>{
    res.status(401).json({
        sucess:true,
        message:"unauthorized user"
    })


})

router.get('/auth/google/callback',passport.authenticate('google',
{

    successRedirect:env.CLIENT_URL,
    failureRedirect:'login/failed'
}
))
 
 


export default router;