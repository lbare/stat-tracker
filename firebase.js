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
  apiKey: '***REMOVED***',
  authDomain: '***REMOVED***',
  projectId: '***REMOVED***',
  storageBucket: '***REMOVED***.appspot.com',
  messagingSenderId: '***REMOVED***',
  appId: '1:***REMOVED***:web:c3c263d8e4907f92a621f6',
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
