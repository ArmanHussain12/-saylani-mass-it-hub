import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQfjviuHgAcA1OP7cRTDytsPpA8MyNiYc",
  authDomain: "saylani-mass-it-hub-1310d.firebaseapp.com",
  projectId: "saylani-mass-it-hub-1310d",
  storageBucket: "saylani-mass-it-hub-1310d.firebasestorage.app",
  messagingSenderId: "177432081952",
  appId: "1:177432081952:web:25f5a822a482185e676e45"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);