import mongoose from 'mongoose';
import {UserDocument, UserInterface} from '../Interfaces/user.interface';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
const userSchema = new mongoose.Schema<UserDocument>({
    fullName: {
        type: String,
        minLength: [5, 'Minimum length for full name should be 5']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    roles: {
        type: String,
        enum: ['student', 'instructor', 'admin'],
        default: 'student'
    },
    enrolledCourse: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    },
    jwt: {
        type: String,
    },
    fcm: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetDateExpire: {
        type: Date
    },
}, {
    timestamps: true
})


userSchema.pre(
    "save",
    async function(this:UserDocument,next){
        if(this.isModified('password')){
            this.password=await bcrypt.hash(this.password,10)
            return 
        }
        next()
    }
    )
    
    userSchema.methods.comparePassword=async function(password:string):Promise<boolean>{
        return await bcrypt.compare(password,this.password)
    }
    
    userSchema.methods.generateToken=async function():Promise<string>{
        const resetToken = crypto.randomBytes(20).toString("hex");
        this.resetDateExpire=Date.now()+10 * 60 * 1000
        this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
        return resetToken
        
        
    }
    const User = mongoose.model<UserDocument>('User', userSchema);
    export default User;