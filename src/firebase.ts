import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "";
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "";
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "";

export const isFirebaseConfigured = Boolean(
  apiKey && 
  apiKey.length > 20 && 
  !apiKey.includes("Dummy") &&
  projectId
);

const firebaseConfig = {
  apiKey: apiKey || "AIzaSyDummyKeyForEndoStudyTrackerApp",
  authDomain: authDomain || "endo-study-tracker.firebaseapp.com",
  projectId: projectId || "endo-study-tracker",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "endo-study-tracker.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
