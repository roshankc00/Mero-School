import mongoose from 'mongoose';
import {LectureInteface} from '../Interfaces/lecture.interface';

const lectureSchema = new mongoose.Schema<LectureInteface>(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        publicId:{
            type:String
        },
        lectureUrl: {
            type: String
        }
    }
    , {
        timestamps: true
    })

const Lecture = mongoose.model<LectureInteface>('Lecture', lectureSchema);

export default Lecture;