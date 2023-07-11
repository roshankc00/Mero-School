import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import Course from '../models/courses.model'
import validateMongodbId from '../utils/validateMongoDbId'
import Lecture from '../models/lecture.model';
import cloudinary from '../config/cloudinary.config';
import { deleteLocalFile } from '../utils/deleteLocalFile';
import Section from '../models/sectionModel';
import mongoose from 'mongoose';

// create section
export const createSection = asyncHandler(async (req: any, res: Response) => {
    try {
        let {title,lectures}=req.body;
        lectures=lectures.map((el:any)=>{
            return new mongoose.Types.ObjectId(el)
        })
      console.log(lectures)

        const section=await Section.create({
            title,
            lectures
        })
         
        res.status(200).json({
            status:true,
            section

        })
      
        
    } catch (error:any) {
        throw new Error(error)        
    }

})


// single section
export const getASinglesection=asyncHandler(async(req:Request,res:Response)=>{
    try {
      const id =req.params.id
      validateMongodbId(id);

      const section=await Section.findById(id);
      if(!section){
        throw new Error("no section with this id exists")
      }

      res.status(200).json({
        sucess:true,
        section
      })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})


// get all the sections 
export const getAllSections=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const sections=await Section.find({})
        if(!sections){
            throw new Error(" no any sections exists")
        }
        res.status(200).json({
            sucess:true,
            sections,
        })        
    } catch (error:any) {
        throw new Error(error)
        
    }
})


//
