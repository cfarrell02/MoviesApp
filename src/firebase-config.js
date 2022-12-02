// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseConfig = {

  apiKey: apiKey,

  authDomain: "web-app-49081.firebaseapp.com",

  projectId: "web-app-49081",

  storageBucket: "web-app-49081.appspot.com",

  messagingSenderId: "515901876728",

  appId: "1:515901876728:web:db6fd09e6dd45b9a63ce0d",

  measurementId: "G-QSQ080KYW1"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
