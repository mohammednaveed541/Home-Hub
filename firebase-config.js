// Import the Firebase SDK (modular syntax)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChlJykcJNp_NvkAHWbmubraAiCWzn22N0",
  authDomain: "employee-management-syst-b5427.firebaseapp.com",
  databaseURL: "https://employee-management-syst-b5427-default-rtdb.firebaseio.com",
  projectId: "employee-management-syst-b5427",
  storageBucket: "employee-management-syst-b5427.firebasestorage.app",
  messagingSenderId: "883445449801",
  appId: "1:883445449801:web:d7f2d6ab6ff0d68b20ab98",
  measurementId: "G-LTMB4QH825"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);

// Check authentication state
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  updateAuthUI();
});

// Update UI based on authentication state
function updateAuthUI() {
  const loginBtn = document.querySelector('.login-btn');
  
  if (currentUser) {
    // User is signed in
    if (loginBtn) {
      loginBtn.textContent = 'My Account';
    }
    
    // Show user-specific elements
    document.querySelectorAll('.auth-required').forEach(el => {
      el.classList.remove('hidden');
    });
    
    // Hide auth message if on sell page
    const authMessage = document.getElementById('auth-message');
    const sellForm = document.getElementById('sell-form');
    
    if (authMessage && sellForm) {
      authMessage.classList.add('hidden');
      sellForm.classList.remove('hidden');
    }
  } else {
    // User is signed out
    if (loginBtn) {
      loginBtn.textContent = 'Login';
    }
    
    // Hide user-specific elements
    document.querySelectorAll('.auth-required').forEach(el => {
      el.classList.add('hidden');
    });
    
    // Show auth message if on sell page
    const authMessage = document.getElementById('auth-message');
    const sellForm = document.getElementById('sell-form');
    
    if (authMessage && sellForm) {
      authMessage.classList.remove('hidden');
      sellForm.classList.add('hidden');
    }
  }
}

export { auth, database };