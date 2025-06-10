import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKvzj7UaKRN0fTGvoA5KMgKzmQbl_J1EQ",
  authDomain: "elimde-az.firebaseapp.com",
  projectId: "elimde-az",
  storageBucket: "elimde-az.appspot.com",
  messagingSenderId: "942935402074",
  appId: "1:942935402074:web:eacddc9716c8bb13a6da63",
  measurementId: "G-CX0FNP8M7E",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
