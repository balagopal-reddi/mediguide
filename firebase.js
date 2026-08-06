import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsmXrZiLltBUqZTNKv5j-OeQrSzZin3w4",
  authDomain: "mediguide-3de1f.firebaseapp.com",
  projectId: "mediguide-3de1f",
  storageBucket: "mediguide-3de1f.firebasestorage.app",
  messagingSenderId: "153892329804",
  appId: "1:153892329804:web:e81fbe8ac8856b694a17e9",
  measurementId: "G-JD362Y9F3S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firebase Config:", firebaseConfig);