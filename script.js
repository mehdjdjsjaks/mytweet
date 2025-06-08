import {
  auth, db,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  onAuthStateChanged, collection, addDoc, getDocs, updateDoc, doc
} from "./firebase-config.js";

const authPage = document.getElementById('authPage');
const mainPage = document.getElementById('mainPage');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignup = document.getElementById('btnSignup');

btnSignup.onclick = () => {
  createUserWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .catch(err => alert(err.message));
};
btnLogin.onclick = () => {
  signInWithEmailAndPassword(auth, emailInput.value, passInput.value)
    .catch(err => alert(err.message));
};

onAuthStateChanged(auth, user => {
  if (user) {
    authPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    loadProfileUI();
    loadMyPosts();
    loadExplore();
  } else {
    authPage.classList.remove('hidden');
    mainPage.classList.add('hidden');
  }
});

function switchSubpage(id) {
  document.querySelectorAll('.subpage').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function saveProfile() {
  const name = document.getElementById('displayName').value;
  const file = document.getElementById('profilePic').files[0];
  if (!name) return alert('اسم بزن برادر!');
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('profile', JSON.stringify({ name, pic: reader.result }));
      loadProfileUI();
      alert('پروفایل ذخیره شد ✅');
    };
    reader.readAsDataURL(file);
  } else {
    localStorage.setItem('profile', JSON.stringify({ name }));
    loadProfileUI();
    alert('پروفایل ذخیره شد ✅');
  }
}

function loadProfileUI() {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  if (profile.name) {
    document.getElementById('displayName').value = profile.name;
  }
  if (profile.pic) {
    const img = document.createElement('img');
    img.src = profile.pic;
    const preview = document.getElementById('profilePreview');
    preview.innerHTML = ''; preview.appendChild(img);
  }
}

async function submitPost() {
  const text = document.getElementById('postText').value.trim();
  if (!text) return alert('پستی بنویس داداش!');
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  if (!profile.name) return alert('اول پروفایل رو تنظیم کن!');
  
  await addDoc(collection(db, "posts"), {
    uid: profile.name,
    text,
    views: 0,
    created: new Date()
  });
  document.getElementById('postText').value = '';
  loadMyPosts();
  loadExplore();
}

async function loadMyPosts() {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  const snapshot = await getDocs(collection(db, "posts"));
  const html = snapshot.docs
    .filter(d => d.data().uid === profile.name)
    .sort((a,b)=>b.data().created - a.data().created)
    .map(d => renderPost(d));
  document.getElementById('myPosts').innerHTML = html.join('');
}

async function loadExplore() {
  const snapshot = await getDocs(collection(db, "posts"));
  const html = await Promise.all(snapshot.docs.sort((a,b)=>b.data().created - a.data().created).map(async d => {
    const data = d.data();
    const newViews = (data.views || 0) + 1;
    await updateDoc(doc(db, "posts", d.id), { views: newViews });
    return renderPost({ id: d.id, data: () => ({ ...data, views: newViews }) });
  }));
  document.getElementById('exploreFeed').innerHTML = html.join('');
}

function renderPost(d){
  const data = d.data();
  return `
    <div class="post">
      <div class="uid" onclick="alert('کانال ${data.uid}')">${data.uid}</div>
      <div>${data.text}</div>
      <div class="views">${data.views} بازدید</div>
    </div>
  `;
}
