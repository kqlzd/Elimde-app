import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO1yAPwKlfj0_XgXtaO8oQnswZVAA_dXY",
  authDomain: "petcare-d4176.firebaseapp.com",
  projectId: "petcare-d4176",
  storageBucket: "petcare-d4176.firebasestorage.app",
  messagingSenderId: "435969404380",
  appId: "1:435969404380:web:d9f3263f02f0977ec1b319",
  measurementId: "G-HWYKBE4S9K",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { db, analytics, auth };
