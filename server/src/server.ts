import express , {Request,Response}from 'express'
import 'dotenv/config'
import env from './utils/validateEnv'
import connectDb from './config/connnectDb'
import { errorHandler, notFound } from './middlewares/errorHandler'
const app=express()
const PORT=env.PORT
// connecting to the database 
connectDb()


app.get('/',(req:Request,res:Response)=>{
    throw new Error("not found",)
})
app.use(errorHandler)
app.use(notFound)
app.listen(PORT,()=>{
    console.log("running running ",PORT)
})


