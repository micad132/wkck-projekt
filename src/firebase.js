// src/firebaseInit.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIboPhp1_wkVvd43deAmeGaIlmlEEq0wE",
  authDomain: "tasklist-89e56.firebaseapp.com",
  databaseURL:
    "https://tasklist-89e56-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tasklist-89e56",
  storageBucket: "tasklist-89e56.appspot.com",
  messagingSenderId: "572483497838",
  appId: "1:572483497838:web:a5ddbc8a0fe51d01195b7f",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
