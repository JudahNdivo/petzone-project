// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDXnf6q8kiUi9qc90jAUGmFenvItoAF5BQ",
  authDomain: "petzone-cd192.firebaseapp.com",
  projectId: "petzone-cd192",
  storageBucket: "petzone-cd192.firebasestorage.app",
  messagingSenderId: "374079335798",
  appId: "1:374079335798:web:38fa79f2ba9e9501149e57",
  measurementId: "G-BQEP03MH1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)