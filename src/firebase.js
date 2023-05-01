// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpqkKjKv2dwPIq6AjDfgY_cD87qR6mBtI",
  authDomain: "react-login-3407e.firebaseapp.com",
  projectId: "react-login-3407e",
  storageBucket: "react-login-3407e.appspot.com",
  messagingSenderId: "1009514861565",
  appId: "1:1009514861565:web:08870617aecbd814c43f94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

