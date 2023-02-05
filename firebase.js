import { getApps, initializeApp, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  docRef,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { useEffect } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyBOgTaYS8HJA1uFEebcKBFukJ72Je_j5GM',
  authDomain: 'stat-tracker-9f25a.firebaseapp.com',
  projectId: 'stat-tracker-9f25a',
  storageBucket: 'stat-tracker-9f25a.appspot.com',
  messagingSenderId: '491322406723',
  appId: '1:491322406723:web:c3c263d8e4907f92a621f6',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

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
};
