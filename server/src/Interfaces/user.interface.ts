import mongoose, { Document } from "mongoose";
import { Request } from "express";






export interface UserInterface extends Document {
    fullName: string;
    email: string;
    password: string;
    roles: string;
    resetPasswordToken: string;
    jwt: string;
    fcm: string;
    resetDateExpire: Date;
    enrolledCourse: mongoose.Schema.Types.ObjectId[];
}


export interface UserDocument extends UserInterface, mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
    comparePassword(password:string):Promise<boolean>;
    generateToken():Promise<string>;
}


export interface CustomRequest extends Request{
    user?:any,
}
















