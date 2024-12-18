// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC__FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC__FIREBASE_authDomain,
  projectId: process.env.NEXT_PUBLIC__FIREBASE_projectId,
  storageBucket: process.env.NEXT_PUBLIC__FIREBASE_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC__FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC__FIREBASE_appId,
  measurementId: process.env.NEXT_PUBLIC__FIREBASE_measurementId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
