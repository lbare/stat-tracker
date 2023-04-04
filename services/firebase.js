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
  getDocs,
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

/* AUTH */
export const login = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredentials.user.uid;
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document");
      return null;
    }
  } catch (error) {
    alert(error);
    return null;
  }
};

export const addUser = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = response.user.uid;
    const data = { uid: uid, email };
    await setDoc(doc(db, "users", uid), data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addSeason = async (season) => {
  try {
    await addDoc(collection(db, "seasons"), season);
    console.log("Season added successfully!");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addGame = async (game) => {
  try {
    await addDoc(collection(db, "games"), game);
    console.log("Game added successfully!");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addAtBat = async (atBat) => {
  try {
    await addDoc(collection(db, "atBats"), atBat);
    console.log("At-bat added successfully!");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* WRITES */
export const getAllSeasons = async () => {
  try {
    const snapshot = await getDocs(collection(db, "seasons"));
    const seasons = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return seasons;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllGames = async () => {
  try {
    const snapshot = await getDocs(collection(db, "games"));
    const games = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return games;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllAtBats = async () => {
  try {
    const snapshot = await getDocs(collection(db, "atBats"));
    const atBats = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return atBats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllGamesBySeason = async (seasonId) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "games"), where("seasonId", "==", seasonId))
    );
    const games = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return games;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllAtBatsBySeason = async (seasonId) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "atBats"), where("seasonId", "==", seasonId))
    );
    const atBats = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return atBats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllAtBatsByGame = async (gameId) => {
  let atBats = [];

  const querySnapshot = await collection(db, "atBats")
    .where("gameId", "==", gameId)
    .get();

  querySnapshot.forEach((doc) => {
    atBats.push(doc.data());
  });

  return atBats;
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
