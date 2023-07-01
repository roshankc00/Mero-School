import {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model'
import { CustomRequest, UserInterface } from '../Interfaces/user.interface'
import env from '../utils/validateEnv'
import jwt from 'jsonwebtoken'
import validateMongodbId from '../utils/validateMongoDbId'
import sendEmail from '../utils/sendmail'
import crypto from 'crypto'


// register the user 
export const registerUser =asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {email,password,fullName}=req.body
        const user=await User.findOne({email})
        if(user){
            throw new Error("user already exists")
        }
        const newUser=await User.create({
            fullName,
            email,
            password
        })

   res.status(200).json({
    sucess:true,
    message:"new user created",
    newUser
   })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})





// login the user
export const loginUser=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            throw new Error("no user  exists")
        }
        const isTrue=await user.comparePassword(password)
        if(!isTrue){
            throw new Error("enter the valid password")
        }
        const tokenData={
            email
        }
        const token=jwt.sign(tokenData,env.SECRET)
        const updatedUser=await User.findOneAndUpdate({email},{
            $set :{
                jwt:token
            }
        });


        res.status(200).json({
            sucess:true,
            message:"user login sucessFully",
            data:{
                token,
                role:user.roles
            }
        })        
    } catch (error:any) {
        throw new Error(error)
        
    }
})


 


// get a single user
export const getASingleUser=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const user=await User.findById(id);
        if(!user){
            throw new Error("user not found")
        }else{
            res.status(200).json({
                sucess:true,
                user 
            })
        }
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})




// get all the Users
export const getAllUser=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const users=await User.find({})
        if(!users){
            throw new Error("no user found")
        }else{
            res.status(200).json({
                sucess:true,
                users
            })
        }
        
    } catch (error:any) {
        throw new Error(error)
        
    }
    
})

 

// forget the passsword
export const forgetPassword=asyncHandler(async(req,res)=>{
    try {
        const {email}=req.body
        const user:any=await User.findOne({email})
        if(!user){
            throw new Error("email doesnt match")
        }
      let resetToken:any=await user.generateToken();
      await user.save()
      const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/user/resetpassword/${resetToken}`
        const message=`Reset Your password on clicking:\n ${resetUrl} `
        try {
            
            await sendEmail({
                email:user.email,
                subject:"reset the password", 
                message  
            })
            
        } catch (error) {
            user.resetPasswordToken=undefined
            user.resetPasswordExpire=undefined
            await user.save()
            console.log(user)
        }
            res.status(200).json({
                sucess:true,
                message:"mail sent sucessfully"
            })
    } catch (error:any) {    
        throw new Error(error)
    }
})





// reset password 
export const resetPassword=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const {newPassword,confirmPassword}=req.body
              
                    if(newPassword!==confirmPassword){
                        throw new Error('the password doesnt match')
                    }
                    const token=req.params.token
                    const resetPasswordToken=crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");
                    const user:any=await User.findOne({
                        resetPasswordToken,
                        resetDateExpire: { $gt: Date.now() }
                         })
                    console.log(user)
                    if(user){
                        user.password=newPassword
                        user.resetPasswordToken=undefined
                        user.resetDateExpire=undefined
                        await user.save()
                        res.status(200).json({
                            sucess:true,
                            message:"password has been changed sucessfully"
                        })
                    }else{
                        throw new Error("the token is expired or the token is not valid")
                    }
                 
    } catch (error:any) {
        throw new Error(error)
        
    }
})
