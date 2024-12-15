// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJzIPrLI1kd8tRMUnfGnClo3JhGqoDug4",
  authDomain: "lodge-verse.firebaseapp.com",
  projectId: "lodge-verse",
  storageBucket: "lodge-verse.firebasestorage.app",
  messagingSenderId: "731892703565",
  appId: "1:731892703565:web:d7eb76789c1c416b4ed704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
export {db, auth}