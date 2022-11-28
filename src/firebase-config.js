// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "web-app-2-ddad9.firebaseapp.com",
  projectId: "web-app-2-ddad9",
  storageBucket: "web-app-2-ddad9.appspot.com",
  messagingSenderId: "813908495212",
  appId: "1:813908495212:web:859eb1d1212262f8060149",
  measurementId: "G-B7H5YYCK9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error.message);
  });
};