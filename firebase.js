import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOgTaYS8HJA1uFEebcKBFukJ72Je_j5GM",
  authDomain: "stat-tracker-9f25a.firebaseapp.com",
  projectId: "stat-tracker-9f25a",
  storageBucket: "stat-tracker-9f25a.appspot.com",
  messagingSenderId: "491322406723",
  appId: "1:491322406723:web:c3c263d8e4907f92a621f6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, collection, addDoc, createUserWithEmailAndPassword };
