import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Course from "../models/courses.model";
import { CustomRequest } from "../Interfaces/user.interface";
import validateMongodbId from "../utils/validateMongoDbId";
import Section from "../models/sectionModel";
import Lecture from "../models/lecture.model";
import cloudinary from "../config/cloudinary.config";
import fs from 'fs'

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

    // sections
    for (let sectionData of sections) {
      const section = new Section({
        title: sectionData.title,
        lectures: [],
      });
      await sections.save();

      // lectures

      for (let lectureData of sectionData.lectures) {
        const lecture = new Lecture({
          title: lectureData.title,
          content: lectureData.content,
          duration: lectureData.duration,
        });
        let result;
        if (req.file.mimetype === "image/jpeg"
        || req.file.mimetype==='image/png'
        || req.file.mimetype==='image/jpg'        
        ) {
          result = await cloudinary.v2.uploader.upload(req.file.path);
        }else{               
            result = await cloudinary.v2.uploader.upload(req.file.path,{
                resource_type:'video',
                folder:'videos'
            });
     
        }
        lecture.lectureUrl=result.secure_url;
        await lecture.save();
        section.lectures.push(lecture._id)

      }
      await section.save()
      course.sections.push(section._id)
    }
    await course.save();
    const fs = require('fs');
// deleting the local file 
    try {
        fs.unlinkSync(`${req.file.path}`);
        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
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
