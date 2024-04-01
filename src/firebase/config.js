// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtRDQkKHXTtz77h_-wV03v7a9JrcvT66M",
  authDomain: "journal-app-ajp.firebaseapp.com",
  projectId: "journal-app-ajp",
  storageBucket: "journal-app-ajp.appspot.com",
  messagingSenderId: "796500455219",
  appId: "1:796500455219:web:0050108d82acf3f6ed5846"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);