// تنظیمات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAlbxBTEXhiLLuBttk5wEoKFLdT5mTSZVg",
  authDomain: "mytweet-6195c.firebaseapp.com",
  projectId: "mytweet-6195c",
  storageBucket: "mytweet-6195c.firebasestorage.app",
  messagingSenderId: "795092445649",
  appId: "1:795092445649:web:2cb97c40afeda12ac058f0"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ناوبری ساده صفحه‌ها
const pages = {
  homePage: document.getElementById('homePage'),
  postPage: document.getElementById('postPage'),
  explorePage: document.getElementById('explorePage')
};
document.getElementById('navHome').onclick = () => showPage('homePage');
document.getElementById('navPost').onclick = () => showPage('postPage');
document.getElementById('navExplore').onclick = () => showPage('explorePage');

function showPage(id) {
  for (let p in pages) {
    pages[p].classList.add('hidden');
  }
  pages[id].classList.remove('hidden');
}

// کنترل ورود/ثبت‌نام
if (window.location.pathname.endsWith('login.html')) {
  document.getElementById('btnSignup').onclick = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, pass)
      .then(() => window.location = 'index.html')
      .catch(console.error);
  };
  document.getElementById('btnLogin').onclick = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, pass)
      .then(() => window.location = 'index.html')
      .catch(console.error);
  };
}
