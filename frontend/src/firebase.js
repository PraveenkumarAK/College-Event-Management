// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-event.firebaseapp.com",
  projectId: "mern-event",
  storageBucket: "mern-event.appspot.com",
  messagingSenderId: "524219720123",
  appId: "1:524219720123:web:ccebfdff3b61719c75e49e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);