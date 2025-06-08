import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, collection, addDoc, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlbxBTEXhiLLuBttk5mTSZVg",
  authDomain: "mytweet-6195c.firebaseapp.com",
  projectId: "mytweet-6195c",
  storageBucket: "mytweet-6195c.firebasestorage.app",
  messagingSenderId: "795092445649",
  appId: "1:795092445649:web:2cb97c40afeda12ac058f0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged, signOut,
  collection, addDoc, getDocs, updateDoc, doc
};
