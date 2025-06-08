import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlbxBTEXhiLLuBttk5wEoKFLdT5mTSZVg",
  authDomain: "mytweet-6195c.firebaseapp.com",
  projectId: "mytweet-6195c",
  storageBucket: "mytweet-6195c.appspot.com",
  messagingSenderId: "795092445649",
  appId: "1:795092445649:web:2cb97c40afeda12ac058f0",
  measurementId: "G-ZH8N56KCLE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("message").innerText = "Sign up successful!";
      setTimeout(() => window.location.href = "home.html", 1000);
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};

window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("message").innerText = "Login successful!";
      setTimeout(() => window.location.href = "home.html", 1000);
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
};
