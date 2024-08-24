// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1DJJcWIe-qoENLn5rFrkFPyhs3Rsg4Oc",
  authDomain: "compiler-ed69c.firebaseapp.com",
  projectId: "compiler-ed69c",
  storageBucket: "compiler-ed69c.appspot.com",
  messagingSenderId: "624211209576",
  appId: "1:624211209576:web:98744f8b57711f2117fadd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};