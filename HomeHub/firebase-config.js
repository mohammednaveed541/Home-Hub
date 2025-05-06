// Import the Firebase SDK
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const database = firebase.database();

// Check authentication state
let currentUser = null;

auth.onAuthStateChanged(user => {
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