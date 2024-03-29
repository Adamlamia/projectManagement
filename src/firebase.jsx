// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqTzCgx6PUfm4x_M3AN6FhzzL87UQImeA",
  authDomain: "project-management-832fb.firebaseapp.com",
  projectId: "project-management-832fb",
  storageBucket: "project-management-832fb.appspot.com",
  messagingSenderId: "161775293571",
  appId: "1:161775293571:web:8a60638b0de774daaff7b6",
  measurementId: "G-5Q9VK5S56Q",
};

/*
https://project-management-832fb.firebaseapp.com/__/auth/handler?apiKey=AIzaSyAqTzCgx6PUfm4x_M3AN6FhzzL87UQImeA&appName=%5BDEFAULT%5D&authType=signInViaRedirect&redirectUrl=http%3A%2F%2Flocalhost%3A5173%2F&v=9.23.0&providerId=google.com&scopes=profile

*/
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const store = getStorage(app);
