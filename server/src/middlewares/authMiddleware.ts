import asyncHandler from 'express-async-handler'
import { Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import validateMongodbId from '../utils/validateMongoDbId'
import env from '../utils/validateEnv'
import User from '../models/user.model'
import { CustomRequest, UserDocument, UserInterface, customREQUESTROLE } from '../Interfaces/user.interface'




// check auth 
export const checkAuth=asyncHandler(async(req:CustomRequest,res:Response,next:NextFunction)=>{
    try {
        if(!req.headers.authorization){
            throw new Error("no token is attach to header")
        }
        let checktoken=req.headers.authorization.startsWith('Bearer')
        if(!checktoken){
            throw new Error("register first")
        }
        let token=req.headers.authorization.split(' ')[1]
        let decoded:any=jwt.verify(token,env.SECRET)
        const email:string=decoded.email
        const user:any=await User.findOne({email})
        req.user=user
        next()   
    } catch (error:any) {
        throw new Error(error)        
    }
})





// check role 
export const checkRole=(...roles:any)=>(req:customREQUESTROLE,res:Response,next:NextFunction)=>{
    if(roles.includes(req?.user?.role)){
        next()
    }else{
        res.status(400).json({
            sucess:false,
            message:"you are not authorized to acess this resource"

        
    })

    }
}

