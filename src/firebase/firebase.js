// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCva_O7fgupRn1-rhxKEH4bK9QkF1-uqI8",
  authDomain: "crowd-ml-demo.firebaseapp.com",
  projectId: "crowd-ml-demo",
  storageBucket: "crowd-ml-demo.appspot.com",
  messagingSenderId: "314663075590",
  appId: "1:314663075590:web:1c36b99cbc670f8ef0a887"
};

const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
export default myFirebase;