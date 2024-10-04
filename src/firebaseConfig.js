// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "zepto-deefb.firebaseapp.com",
  projectId: "zepto-deefb",
  storageBucket: "zepto-deefb.appspot.com",
  messagingSenderId: "1005474521542",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-E56KPMWLHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };