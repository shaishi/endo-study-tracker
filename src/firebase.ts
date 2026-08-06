import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAeOQQhZ9oC5T-Gze76J4h549Q_S9g2rOU";
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "endo-tracker-d493c.firebaseapp.com";
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "endo-tracker-d493c";

export const isFirebaseConfigured = Boolean(
  apiKey && 
  apiKey.length > 20 && 
  !apiKey.includes("Dummy") &&
  projectId
);

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "endo-tracker-d493c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "72211746049",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:72211746049:web:4f256836c34ce8d5ed9f00",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WSWV7S6TN8"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
