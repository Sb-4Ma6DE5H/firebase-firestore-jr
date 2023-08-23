import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCI0fLKDXuK0T8wOh2Odj6U0HNzgGN2QUk",
  authDomain: "pedrotech-bc305.firebaseapp.com",
  projectId: "pedrotech-bc305",
  storageBucket: "pedrotech-bc305.appspot.com",
  messagingSenderId: "447516910070",
  appId: "1:447516910070:web:85252f176a66a6d98867d7",
  measurementId: "G-1TFVQCGP6F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider(app)

export const db = getFirestore(app)
export const storage = getStorage(app)