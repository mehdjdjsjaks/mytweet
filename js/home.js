import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

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

window.submitPost = async function () {
  const content = document.getElementById("postContent").value.trim();
  if (!content) return;
  await addDoc(collection(db, "posts"), {
    content,
    createdAt: new Date().toISOString()
  });
  document.getElementById("postContent").value = "";
  loadPosts();
};

async function loadPosts() {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const exploreDiv = document.getElementById("explorePosts");
  exploreDiv.innerHTML = "";
  snapshot.forEach(doc => {
    const post = doc.data();
    exploreDiv.innerHTML += `<div class="post">${post.content}</div>`;
  });
}

window.addEventListener("DOMContentLoaded", loadPosts);
