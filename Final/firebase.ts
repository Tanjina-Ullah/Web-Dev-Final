// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjtpJPELr9iqWInOhl7vt3e08d40YHoQM",
  authDomain: "final-project-1cf2b.firebaseapp.com",
  projectId: "final-project-1cf2b",
  storageBucket: "final-project-1cf2b.firebasestorage.app",
  messagingSenderId: "865253389517",
  appId: "1:865253389517:web:6f8f375c6b1d162644e584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
