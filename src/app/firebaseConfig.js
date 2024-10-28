// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnzp1MAaEVSYz7eSc1ba__UoNcAVbwR5I",
  authDomain: "trying-version-e4871.firebaseapp.com",
  projectId: "trying-version-e4871",
  storageBucket: "trying-version-e4871.appspot.com",
  messagingSenderId: "869445060340",
  appId: "1:869445060340:web:85b0039747ddf03da380a1",
  measurementId: "G-RCJSXLHJFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);