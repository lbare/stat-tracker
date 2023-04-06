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
  deleteDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";

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
    const result = await setDoc(doc(db, "users", uid), data);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addSeason = async (season, id = null) => {
  try {
    const docRef = id ? doc(db, "seasons", id) : doc(collection(db, "seasons"));
    const result = await setDoc(docRef, season);
    console.log("Season added successfully!");
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addGame = async (game, id = null) => {
  try {
    const docRef = id ? doc(db, "games", id) : doc(collection(db, "games"));
    const result = await setDoc(docRef, game);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addAtBat = async (atBat, gameId, atBatId = null) => {
  try {
    console.log("Adding at-bat...");
    const gameRef = doc(db, "games", gameId);
    const atBatRef = atBatId
      ? doc(gameRef, "atBats", atBatId)
      : doc(collection(gameRef, "atBats"));
    const result = await setDoc(atBatRef, atBat);
    console.log("At-bat added successfully!");
    return result;
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
    const games = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      date: doc.data().date.toDate(),
    }));
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

/* DELETES */
export const deleteSeason = async (id) => {
  try {
    const result = await deleteDoc(doc(db, "seasons", id));
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGame = async (id) => {
  try {
    const result = await deleteDoc(doc(db, "games", id));
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteAtBat = async (id) => {
  try {
    const result = await deleteDoc(doc(db, "atBats", id));
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateId = () => {
  return uuid.v4();
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
