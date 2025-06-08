import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

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

  try {
    await addDoc(collection(db, "posts"), {
      text,
      uid: currentUser.uid,
      createdAt: new Date()
    });
    document.getElementById("newPost").value = "";
    loadPosts();
  } catch (error) {
    console.error("Error posting:", error);
    alert("There was an error posting your message.");
  }
};

async function loadPosts() {
  const container = document.getElementById("exploreFeed");
  container.innerHTML = "";

  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const date = data.createdAt?.toDate?.().toLocaleString() || "";

      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <p>${data.text}</p>
        <small>${date}</small><br>
        ${data.uid === currentUser.uid ? `<button onclick="deletePost('${docSnap.id}')">🗑️ Delete</button>` : ""}
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    container.innerHTML = "<p>Couldn't load posts.</p>";
  }
}

window.deletePost = async function (postId) {
  if (confirm("Delete this post?")) {
    try {
      await deleteDoc(doc(db, "posts", postId));
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  }
};
