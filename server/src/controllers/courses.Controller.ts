import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/courses.model";
import { CustomRequest } from "../Interfaces/user.interface";
import validateMongodbId from "../utils/validateMongoDbId";
import Section from "../models/sectionModel";
import Lecture from "../models/lecture.model";
import cloudinary from "../config/cloudinary.config";
import { deleteLocalFile } from "../utils/deleteLocalFile";
import { error } from "console";

export const createCourse = asyncHandler(async (req: any, res: Response) => {
  const { title, description, price, duration, sections, categories, content } =
    req.body;
  try {
    const instructorId = req.user._id;
    validateMongodbId(instructorId);
    const course = new Course({
      title,
      description,
      price,
      duration,
      sections: [],
      categories,
      content,
      instructorId,
    });
    await course.save();     

    if(sections.length>0){

         // sections
    for (let sectionData of sections) {
      const section = new Section({
        title: sectionData.title,
        lectures: [],
      });
      await section.save();

      // lectures
      for (let lectureData of sectionData.lectures) {
        const lecture = new Lecture({
          title: lectureData.title,
          content: lectureData.content,
          duration: lectureData.duration,
        });
        
     
        section.lectures.push(lecture._id)
        await lecture.save()

      }

      let results=[];
      for (let file of req.files){
        let result;
        if (file.mimetype === "image/jpeg"
        || file.mimetype==='image/png'
      || file.mimetype==='image/jpg'        
      ) {
        result = await cloudinary.v2.uploader.upload(file.path);
      }else{               
        result = await cloudinary.v2.uploader.upload(file.path,{
              resource_type:'video',
              folder:'videos'
            });
            
          }
          results.push(result);

        }


        let resultIndex=0;
        for(let lectureId of section.lectures){
          console.log(lectureId)
          const lecture:any=await Lecture.findById(lectureId)
          lecture.lectureUrl=results[resultIndex].secure_url
          lecture.publicId=results[resultIndex].public_id
          await lecture.save();
          resultIndex ++;
        }
      await section.save()
      course.sections.push(section._id)
    }
    await course.save();
    
    
    // deleting the local file 
    for (let data of req.files){
      deleteLocalFile(data.path);

    } 
  }
     res.status(200).json({
        sucess:true,
        message:"course created sucessfully",
        course,
    })


  } catch (error: any) {
    throw new Error(error);
  }
});




export const getCourses=asyncHandler(async(req:Request,res:Response)=>{
  try {
    const courses=await Course.find({})
    if(!courses){
      throw new Error("courses not found");
    }

    else{
      res.status(200).json({
        sucess:true,
        courses
      })
    }
    
  } catch (error:any) {
    throw new Error(error)
    
  }
})




// export const editCourse=asyncHandler(async(req:Request,res:Response)=>{
//   try {
//     const id=req.params.id;
//     const {isEdited}=req.body;
//     const course

    
//   } catch (error:any) {
//     throw new Error(error)    
//   }
// })