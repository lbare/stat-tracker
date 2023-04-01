import { getApps, initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  docRef,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOgTaYS8HJA1uFEebcKBFukJ72Je_j5GM",
  authDomain: "stat-tracker-9f25a.firebaseapp.com",
  projectId: "stat-tracker-9f25a",
  storageBucket: "stat-tracker-9f25a.appspot.com",
  messagingSenderId: "491322406723",
  appId: "1:491322406723:web:c3c263d8e4907f92a621f6",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export const login = (email, password) => {
  let user = null;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const uid = userCredentials.user.uid;
      getDoc(doc(db, "users", uid)).then((docSnap) => {
        if (docSnap.exists()) {
          user = docSnap.data();
        } else {
          console.log("No such document");
        }
      });
    })
    .catch((error) => {
      alert(error);
    });

  return user;
};

export const register = (email, password) => {
  let user = null;

  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      const uid = response.user.uid;
      const data = {
        uid: uid,
        email,
      };
      setDoc(doc(db, "users", uid), data)
        .then((user = data))
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      alert(error);
    });

  return user;
};

export {
  db,
  auth,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  docRef,
  doc,
  getDoc,
  setDoc,
  onAuthStateChanged,
};
