// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../configs/firebaseConfig";
import { Firestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const firestore = new Firestore({
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  keyFilename:
    "../../service-desk-app-ce9b0-firebase-adminsdk-1fd7l-8de221610b.json",
});
export { auth, db, firestore };
