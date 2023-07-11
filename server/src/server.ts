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



// uncaughtException error handler
process.on("uncaughtException", (error: any) => {
  console.log(` Error:${error.message}`);
  console.log("shuttting down the server due to uncaughtException ");
  process.exit(1);
});


 
// rest variables
const app = express();
const PORT = env.PORT || 7000;



// connecting to the database
connectDb();




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
app.use(cors())




// routes
app.use(allRoute)
// error handlers
app.use(errorHandler);
app.use(notFound);


// listening to the server 
const server = app.listen(PORT, () => {
  console.log(`Listening at the port ${PORT}`);
});




// unhandled Rejection error handler
process.on("unhandledRejection", (error: any) => {
  console.log(` Error:${error.message}`);
  console.log("shuttting down the server due to  unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

