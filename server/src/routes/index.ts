import express,{Request,Response} from 'express'
import passport from 'passport'
import env from '../utils/validateEnv'
import jwt from 'jsonwebtoken'

const router=express.Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('login/failed',(req:Request,res:Response)=>{
    res.status(401).json({
        sucess:true,
        message:"unauthorized user"
    })


})



router.get('/auth/google/callback',async(req,res,next)=>{

    passport.authenticate('google',(err:any,user: any)=>{
        if(err){
          return res.status(400).json({
            sucess:false,
            err
          })
        }
        const secretKey=env.SECRET ?? '';
        const token=jwt.sign(user['_json'].email,secretKey)
        res.cookie('jwtToken',token);
        res.redirect(`${env.CLIENT_URL}/dashboard`);
    })(req,res,next)
 
})
 
 


export default router;