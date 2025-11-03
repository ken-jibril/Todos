// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSJLl1obrFB6l4wNgN__CG19dL_bRS_5Q",
  authDomain: "taskmaster-26e03.firebaseapp.com",
  projectId: "taskmaster-26e03",
  storageBucket: "taskmaster-26e03.firebasestorage.app",
  messagingSenderId: "558079058065",
  appId: "1:558079058065:web:a740a734cec73d0e4cdf30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);