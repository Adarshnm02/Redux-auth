// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "redux-auth-21c41.firebaseapp.com",
  projectId: "redux-auth-21c41",
  storageBucket: "redux-auth-21c41.appspot.com",
  messagingSenderId: "713009839302",
  appId: "1:713009839302:web:f455d7c939bce49a4a6bc7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);