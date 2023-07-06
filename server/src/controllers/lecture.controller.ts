import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import Course from '../models/courses.model'
import validateMongodbId from '../utils/validateMongoDbId'
import Lecture from '../models/lecture.model';
import cloudinary from '../config/cloudinary.config';
import { deleteLocalFile } from '../utils/deleteLocalFile';

export const createLecture = asyncHandler(async (req: any, res: Response) => {
    try {
        const {title,content,duration}=req.body
          let result;
          if (req.file?.mimetype === "image/jpeg"
          || req.file?.mimetype==='image/png'
          || req.file?.mimetype==='image/jpg'        
          ) {
            result = await cloudinary.v2.uploader.upload(req.file.path);
          }else{               
              result = await cloudinary.v2.uploader.upload(req.file.path,{
                  resource_type:'video',
                  folder:'videos'
              });
          }
        let lectureUrl=result.secure_url;
        const lecture=await Lecture.create({
            title,
            content,
            duration,
            lectureUrl
        })

          deleteLocalFile(req.file.path)

          
          res.status(200).json({
            sucess:'true',
            message:"lecture created sucessfully",
            lecture
          })
        
    } catch (error:any) {
        throw new Error(error)        
    }

})


// single lecture 
export const getASingleLecture=asyncHandler(async(req:Request,res:Response)=>{
    try {
      const id =req.params.id
      validateMongodbId(id);

      const lecture=await Lecture.findById(id);
      if(!lecture){
        throw new Error("no lecture with this id exists")
      }

      res.status(200).json({
        sucess:true,
        lecture
      })
        
    } catch (error:any) {
        throw new Error(error)
        
    }
})


// get all the lectures 
export const getAllLectures=asyncHandler(async(req:Request,res:Response)=>{
    try {
        const lectures=await Lecture.find({})
        if(!lectures){
            throw new Error(" no any lecture exists")
        }
        res.status(200).json({
            sucess:true,
            lectures,
        })        
    } catch (error:any) {
        throw new Error(error)
        
    }
})


// delete lecture 
export const deleteLecture=asyncHandler(async(req:Request,res:Response)=>{
  try {
    const id =req.params.id
    validateMongodbId(id);

    const lecture=await Lecture.findById(id);
    if(!lecture){
      throw new Error("no lecture with this id exists")
    }
  await Lecture.findByIdAndDelete(id);
    res.status(200).json({
      sucess:true,
      message:"lecture deleted sucessfully"
    })
      
  } catch (error:any) {
      throw new Error(error)
      
  }
})