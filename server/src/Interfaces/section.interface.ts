import mongoose, { Document } from "mongoose";

 export interface SectionInterface extends Document {
    title: string;
    lectures: mongoose.Schema.Types.ObjectId[];
}
