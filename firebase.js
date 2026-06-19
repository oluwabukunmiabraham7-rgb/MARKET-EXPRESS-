import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    initializeFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    deleteDoc, 
    doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1w8tUDW6XTfkPceprjj1kJed9CM5r6YA",
  authDomain: "enitan-collection-7e541.firebaseapp.com",
  projectId: "enitan-collection-7e541",
  storageBucket: "enitan-collection-7e541.firebasestorage.app",
  messagingSenderId: "652278502258",
  appId: "1:652278502258:web:7e3058b2f96570c728c3eb"
};

const app = initializeApp(firebaseConfig);

// Stable connection for MTN/Airtel networks
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db, collection, addDoc, onSnapshot, deleteDoc, doc };
