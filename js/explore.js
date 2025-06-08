import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

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
const db = getFirestore(app);

const explorePosts = document.getElementById("explorePosts");

async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  explorePosts.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const post = doc.data();
    const postElement = document.createElement("div");
    postElement.style.borderBottom = "1px solid #333";
    postElement.style.padding = "1rem";
    postElement.innerHTML = `<p>${post.text}</p><small>By: ${post.user}</small>`;
    explorePosts.appendChild(postElement);
  });
}

loadPosts();
