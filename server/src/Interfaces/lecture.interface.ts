import { Document } from "mongoose";

export interface LectureInteface extends Document {
    title: string;
    content: string;
    duration: number;
    lectureUrl: string;
    publicId:string;
}
