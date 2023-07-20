import { initializeApp } from 'firebase-admin/app';
import path from 'path';
import admin from 'firebase-admin'




const initializeFirebaseApp=()=>{
    const serviceAccount=path.join(`${__dirname}/config/mero-school-66a74-firebase-adminsdk-5a1pr-64215e6372.json`)
    initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
}

export default initializeFirebaseApp




