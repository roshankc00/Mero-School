import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/courses.model";
import { CustomRequest } from "../Interfaces/user.interface";
import validateMongodbId from "../utils/validateMongoDbId";
import Section from "../models/sectionModel";
import Lecture from "../models/lecture.model";
import cloudinary from "../config/cloudinary.config";
import { deleteLocalFile } from "../utils/deleteLocalFile";

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
        let result;
        for (let file of req.files){

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
            lecture.lectureUrl=result.secure_url;
            await lecture.save();
          }
        section.lectures.push(lecture._id)

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
        course
    })


  } catch (error: any) {
    throw new Error(error);
  }
});



// loop lagaxa sections 