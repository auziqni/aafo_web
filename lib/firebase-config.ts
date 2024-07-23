import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue, set } from "firebase/database";
// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDOW8QCsSR-OY46z7RNJmwvCDkln29FZRQ",
  authDomain: "aafo-9b7b2.firebaseapp.com",
  databaseURL:
    "https://aafo-9b7b2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "aafo-9b7b2",
  storageBucket: "aafo-9b7b2.appspot.com",
  messagingSenderId: "114532310730",
  appId: "1:114532310730:web:6733764d75737fb8531e33",
  measurementId: "G-68BYNQJZPL",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, get, onValue, set };
