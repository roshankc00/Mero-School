import env from './utils/validateEnv'
import express , {Request,Response}from 'express'
import 'dotenv/config'
import connectDb from './config/connnectDb'
import { errorHandler, notFound } from './middlewares/errorHandler'


process.on("uncaughtException",(error:any)=>{
    console.log(` Error:${error.message}`)
    console.log("shuttting down the server due to uncaughtException ")
    process.exit(1)
   
})



















// rest variables 
const app=express()
const PORT=env.PORT
















// connecting to the database 
connectDb()

// middlewares
app.use(express.json())

// routes



// error handlers
app.use(errorHandler)
app.use(notFound)
const server =app.listen(PORT,()=>{
    console.log(`Listening at the port ${PORT}`);
}) 




process.on("unhandledRejection",(error:any)=>{
    console.log(` Error:${error.message}`)
    console.log("shuttting down the server due to  unhandled promise rejection")
    server.close(()=>{
        process.exit(1);
    })
})






