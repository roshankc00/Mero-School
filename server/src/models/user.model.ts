import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String
    },
    password:{
        type:String
    },
    jwt:{
        type:String
    },
    roles:{
        type:String,
        enum:['student','instructor','admin'],
        default:'student'
    },
    fcm:{
        type:String
    }

},{timestamps:true})

const User=mongoose.model('User',userSchema)
 export default User 









//  476536484441-o280rmidu42ohamadmpj88rkp8c3e594.apps.googleusercontent.com