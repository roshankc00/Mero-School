import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import Course from '../models/courses.model'
import validateMongodbId from '../utils/validateMongoDbId'
import Lecture from '../models/lecture.model';
import cloudinary from '../config/cloudinary.config';
import { deleteLocalFile } from '../utils/deleteLocalFile';


// create the lecture
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
        let publicId=result.public_id;
        const lecture=await Lecture.create({
            title,
            content,
            duration,
            lectureUrl,
            publicId
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
    const deleteImage=await cloudinary.v2.uploader.destroy(lecture?.publicId)
  await Lecture.findByIdAndDelete(id);

    res.status(200).json({
      sucess:true,
      message:"lecture deleted sucessfully"
    })
      
  } catch (error:any) {
      throw new Error(error)
      
  }
})





// update the lecture
export const editLecture=asyncHandler(async(req:any,res:Response):Promise<void>=>{
  try {
    const id=req.params.id
    validateMongodbId(id)
    let  {isVideoEdited}=req.body;
    const lecture=await Lecture.findById(id);
   req.body.isVideoEdited=Boolean(req.body.isVideoEdited)
   req.body.duration=Number(req.body.duration)  
    let  updatedLecture;
    console.log(typeof req.body.duration,"duration")
    if(!lecture){
      throw new Error('lecture not found')
    }
    else{
      if(req.body.isVideoEdited){
        const destroy=await cloudinary.v2.uploader.destroy(lecture?.publicId)
        const upload=await cloudinary.v2.uploader.upload(req?.file?.path);
        const lectureUrl=upload.secure_url;
        req.body.lectureUrl=lectureUrl;
        delete req.body.isVideoEdited
        updatedLecture=await Lecture.findByIdAndUpdate(id,{
          $set:req.body
        },{new:true})    
      }else{
        updatedLecture=await Lecture.findByIdAndUpdate(id,{
          $set:req.body
        },{new:true})
      }
    }
  

    res.status(200).json({
      sucess:true,
      message:"lecture updated sucessfullly",
      updatedLecture
     })
   
  } catch (error:any) {
    throw new Error(error)
    
  }
})


