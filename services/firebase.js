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
  updateDoc,
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

/* WRITES */
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

export const addAtBat = async (atBat, gameId) => {
  try {
    const gameRef = doc(db, "games", gameId);
    const gameDoc = await getDoc(gameRef);

    let { atBats } = gameDoc.data();
    let result;

    if (!atBats) {
      atBats = [];
      atBats.push(atBat);
    } else {
      atBats.push(atBat);
    }
    result = await updateDoc(gameRef, { atBats: atBats });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPitchingGame = async (gameId, pitching) => {
  try {
    const gameRef = doc(db, "games", gameId);
    const result = await updateDoc(gameRef, { pitching: { ...pitching } });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addPitchingInning = async (gameId, newInning) => {
  try {
    const gameRef = doc(db, "games", gameId);
    const gameDoc = await getDoc(gameRef);

    let { pitching } = gameDoc.data();

    if (!pitching) {
      // If there's no existing pitching object, create a new one with the new inning
      pitching = {
        inningsPitched: 1,
        earnedRuns: newInning.earnedRuns,
        runs: newInning.runs,
        strikeouts: newInning.strikeouts,
        walks: newInning.walks,
        hits: newInning.hits,
      };
    } else {
      // If there's an existing pitching object, merge the new inning with it
      pitching = {
        inningsPitched: pitching.inningsPitched + 1,
        earnedRuns: pitching.earnedRuns + newInning.earnedRuns,
        runs: pitching.runs + newInning.runs,
        strikeouts: pitching.strikeouts + newInning.strikeouts,
        walks: pitching.walks + newInning.walks,
        hits: pitching.hits + newInning.hits,
      };
    }

    const result = await updateDoc(gameRef, { pitching: { ...pitching } });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllGames = async () => {
  try {
    const gamesSnapshot = await getDocs(collection(db, "games"));
    const games = await Promise.all(
      gamesSnapshot.docs.map(async (gameDoc) => {
        let atBats = [];
        const atBatsRef = collection(gameDoc.ref, "atBats");
        const atBatsSnapshot = await getDocs(atBatsRef);
        if (!atBatsSnapshot.empty) {
          atBats = atBatsSnapshot.docs.map((atBatDoc) => ({
            ...atBatDoc.data(),
            id: atBatDoc.id,
          }));
        }
        return {
          ...gameDoc.data(),
          atBats: atBats,
          date: gameDoc.data().date.toDate(),
          id: gameDoc.id,
        };
      })
    );
    return games;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateGameScore = async (gameId, homeScore, awayScore) => {
  try {
    const gameRef = doc(db, "games", gameId);
    const result = await updateDoc(gameRef, { homeScore, awayScore });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
