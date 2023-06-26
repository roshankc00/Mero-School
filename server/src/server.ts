import express , {Request,Response}from 'express'

const app=express()


app.get('/',(req:Request,res:Response)=>{
    res.send("from server")
})

app.listen(5000,()=>{
    console.log("running running ")
})
