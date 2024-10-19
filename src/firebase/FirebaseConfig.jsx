// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD3JG9-Bt1vwxqrcmy8blpAID_oybz8cQ",
  authDomain: "easybuy-28f05.firebaseapp.com",
  projectId: "easybuy-28f05",
  storageBucket: "easybuy-28f05.appspot.com",
  messagingSenderId: "331686942132",
  appId: "1:331686942132:web:d8540b7effe7fa75b50ee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)
const auth = getAuth(app)

export {fireDB, auth}