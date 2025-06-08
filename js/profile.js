import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    loadProfile(user.uid);
    window.saveProfile = async function () {
      const name = document.getElementById("name").value;
      const bio = document.getElementById("bio").value;
      const photoURL = document.getElementById("photoURL").value;

      await setDoc(doc(db, "profiles", user.uid), {
        name,
        bio,
        photoURL,
        uid: user.uid,
      });

      alert("Profile updated!");
      loadProfile(user.uid);
    };
  } else {
    alert("You need to log in.");
    window.location.href = "index.html";
  }
});

async function loadProfile(uid) {
  const docRef = doc(db, "profiles", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("profileInfo").innerHTML = `
      <img src="${data.photoURL}" alt="Profile Photo" style="width:100px;border-radius:50%;margin-bottom:1rem;">
      <h3>${data.name}</h3>
      <p>${data.bio}</p>
    `;
  } else {
    document.getElementById("profileInfo").innerText = "No profile set yet.";
  }
}
