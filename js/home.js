import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    loadPosts();
  } else {
    window.location.href = "index.html";
  }
});

window.submitPost = async function () {
  const text = document.getElementById("newPost").value.trim();
  if (!text) return alert("Write something to post!");
  await addDoc(collection(db, "posts"), {
    text,
    uid: currentUser.uid,
    createdAt: new Date()
  });
  document.getElementById("newPost").value = "";
  loadPosts();
};

async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const container = document.getElementById("exploreFeed");
  container.innerHTML = "";
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <p>${data.text}</p>
      ${data.uid === currentUser.uid ? `<button onclick="deletePost('${docSnap.id}')">🗑️ Delete</button>` : ""}
    `;
    container.appendChild(div);
  });
}

window.deletePost = async function (postId) {
  if (confirm("Delete this post?")) {
    await deleteDoc(doc(db, "posts", postId));
    loadPosts();
  }
};
