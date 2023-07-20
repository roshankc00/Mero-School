import admin from 'firebase-admin'
const sendNotification=async(fcm:string,message:any)=>{
    const notification={
        token:fcm,
        notification:{
            title:"New Courses Alert",
            body:message
        }
    }
    
 const not=   await admin.messaging().send(notification)
    console.log(`notification send ${not}`)

}

export default sendNotification