// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClSPnjU-NJtGg2rYheDlZ7bH13t70Lz3E",
  authDomain: "netflix-app-5a239.firebaseapp.com",
  projectId: "netflix-app-5a239",
  storageBucket: "netflix-app-5a239.appspot.com",
  messagingSenderId: "220204614128",
  appId: "1:220204614128:web:f78fab62c04b0886485d35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app)