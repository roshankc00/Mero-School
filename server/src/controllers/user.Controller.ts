import {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model'
import { CustomRequest, UserInterface } from '../Interfaces/user.interface'
import env from '../utils/validateEnv'
import jwt from 'jsonwebtoken'
export const registerUser =asyncHandler(async(req:Request,res)=>{
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



export const loginUser=asyncHandler(async(req:any,res)=>{
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
        res.status(200).json({
            sucess:true,
            message:"user created sucessFully",
            token
        })




        
    } catch (error:any) {
        throw new Error(error)
        
    }
})