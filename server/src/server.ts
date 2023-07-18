import express  from "express";
import "dotenv/config";
import env from "./utils/validateEnv";
import connectDb from "./config/connnectDb";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import passport from "passport";
import expressSession from "express-session";
import cors from 'cors'
import allRoute from './routes/index'
import {passportInitialize} from "./middlewares/passport.middleware";
import { Server,Server as SocketIOServer } from "socket.io";

import http from 'http'



// uncaughtException error handler
process.on("uncaughtException", (error: any) => {
  console.log(` Error:${error.message}`);
  console.log("shuttting down the Server due to uncaughtException ");
  process.exit(1);
});



// rest variables
const PORT = env.PORT || 7000;
const app = express();
const server =http.createServer(app);
app.use(cors())

// initialiizng the socket io
const io:SocketIOServer=new Server(server,{
  cors:{
    origin:'http://localhost:5173'
  }
})

connectDb();




// creating the session 
app.use(expressSession({ 
    secret: "test123#",
    resave: true,
    saveUninitialized: true,
    cookie:{secure:true}

  })
);



// middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
passportInitialize();
app.use(passport.initialize());
app.use(passport.session());




// routes
app.use(allRoute)
// error handlers
app.use(errorHandler);
app.use(notFound);




//socket  event handling 
io.on('connection',(socket)=>{
  console.log("User connnected",socket.id);
 
  // data refers to the room id sent from server 
  socket.on('join_room',(data)=>{
    socket.join(data);
    console.log("wow")
    console.log(` user with an id ${socket.id} joined the room ${data}`)

  })

  // in this case data refers to message from client 
  socket.on('send_message',(data)=>{
    // database save message 
    socket.to(data.room).emit('recieve_message',data)
  })

  socket.on('disconnect',()=>{
    console.log('User disconnected',socket.id);
  })
})

io.listen(9000)




// listening to the runningServer 
const runningServer = app.listen(PORT, () => {
  console.log(`Listening at the port ${PORT}`);
});




// unhandled Rejection error handler
process.on("unhandledRejection", (error: any) => {
  console.log(` Error:${error.message}`);
  console.log("shuttting down the Server due to  unhandled promise rejection");
  runningServer.close(() => {
    process.exit(1);
  });
});

