
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCdNo6VFMKCcgOx8t1SU6ZzFpyqe1P54a0",
  authDomain: "codecrypt-b591f.firebaseapp.com",
  projectId: "codecrypt-b591f",
  storageBucket: "codecrypt-b591f.appspot.com",
  messagingSenderId: "778461058311",
  appId: "1:778461058311:web:fa4d6a767346e1438821a2",
  measurementId: "G-R2C510JXC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
const analytics = getAnalytics(app);