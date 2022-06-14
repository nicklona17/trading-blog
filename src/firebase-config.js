// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA69CzRhwxT2utbj2mz94aHvR0997OgNWQ",
  authDomain: "trading-blog-45bb9.firebaseapp.com",
  projectId: "trading-blog-45bb9",
  storageBucket: "trading-blog-45bb9.appspot.com",
  messagingSenderId: "661236525798",
  appId: "1:661236525798:web:7a23492278aa2803056927",
  measurementId: "G-X12KPQQY16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();