import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS_UxKUBAaVoHNnJMKpqGj5SmO9dSxRqs",
  authDomain: "gamematch-15730.firebaseapp.com",
  projectId: "gamematch-15730",
  storageBucket: "gamematch-15730.appspot.com",
  messagingSenderId: "927565540013",
  appId: "1:927565540013:web:929414ee7d7589a7b0f424",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db, onAuthStateChanged, signInWithEmailAndPassword, signOut };
