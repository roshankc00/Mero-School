// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging} from 'firebase/messaging'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mero-school-66a74.firebaseapp.com",
  projectId: "mero-school-66a74",
  storageBucket: "mero-school-66a74.appspot.com",
  messagingSenderId: "572335667716",
  appId: "1:572335667716:web:a29dd94f3fb82b2cc11351",
  measurementId: "G-C9HY35G1SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging=getMessaging(app)  
export default messaging
