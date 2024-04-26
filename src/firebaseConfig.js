// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8XHkpef6Azxvtu3GwNTS6HqzK0j_SOLE",
  authDomain: "zepto-deefb.firebaseapp.com",
  projectId: "zepto-deefb",
  storageBucket: "zepto-deefb.appspot.com",
  messagingSenderId: "1005474521542",
  appId: "1:1005474521542:web:d199504aff7d090c8592c7",
  measurementId: "G-E56KPMWLHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };