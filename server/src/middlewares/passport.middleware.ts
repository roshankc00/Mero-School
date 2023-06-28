import passport from 'passport'
import { Request,Response } from 'express'
import {Strategy} from 'passport-google-oauth20'
import env from '../utils/validateEnv'



const clientId=env.GOOGLE_CLIENT_ID || ''
const clientSecret=env.GOOGLE_CLIENT_SECRET || ''

passport.use(new Strategy({
    clientID:clientId,
    clientSecret:clientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken:string, refreshToken:string, profile:object, cb:any) {
    console.log(profile)
       cb(null, profile);
  }
))







passport.serializeUser((user: object,done:any)=>{
    done(null,user)
})


export default passport