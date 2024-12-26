// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJZC8NTPF8r0o1-CzPRExWVdW9GD0vDV0",
  authDomain: "blogging--app-bf237.firebaseapp.com",
  projectId: "blogging--app-bf237",
  storageBucket: "blogging--app-bf237.appspot.com",
  messagingSenderId: "281105395045",
  appId: "1:281105395045:web:6a9a3c1391c8f668da458c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
