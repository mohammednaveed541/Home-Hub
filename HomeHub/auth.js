document.addEventListener('DOMContentLoaded', () => {
  // Tab switching functionality
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const showSignup = document.getElementById('show-signup');
  const showLogin = document.getElementById('show-login');
  
  function switchToLogin() {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  }
  
  function switchToSignup() {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
  
  if (loginTab && signupTab) {
    loginTab.addEventListener('click', switchToLogin);
    signupTab.addEventListener('click', switchToSignup);
    showSignup.addEventListener('click', (e) => {
      e.preventDefault();
      switchToSignup();
    });
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      switchToLogin();
    });
  }
  
  // Initialize Firebase (replace with your actual Firebase config)
  const firebaseConfig = {
    // Your Firebase configuration object here
    // Example:
    // apiKey: "YOUR_API_KEY",
    // authDomain: "YOUR_AUTH_DOMAIN",
    // projectId: "YOUR_PROJECT_ID",
    // storageBucket: "YOUR_STORAGE_BUCKET",
    // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    // appId: "YOUR_APP_ID"
  };

  // Check if Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Login functionality
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }
      
      // Show loading state
      loginBtn.textContent = 'Logging in...';
      loginBtn.disabled = true;
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Redirect to homepage after successful login
          window.location.href = 'index.html';
        })
        .catch((error) => {
          alert(`Login failed: ${error.message}`);
          loginBtn.textContent = 'Login';
          loginBtn.disabled = false;
        });
    });
  }
  
  // Signup functionality
  const signupBtn = document.getElementById('signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm').value;
      
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      // Show loading state
      signupBtn.textContent = 'Creating account...';
      signupBtn.disabled = true;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Add user details to database
          const user = userCredential.user;
          return firebase.database().ref('users/' + user.uid).set({
            name: name,
            email: email,
            createdAt: new Date().toISOString()
          });
        })
        .then(() => {
          // Redirect to homepage after successful signup
          window.location.href = 'index.html';
        })
        .catch((error) => {
          alert(`Signup failed: ${error.message}`);
          signupBtn.textContent = 'Sign Up';
          signupBtn.disabled = false;
        });
    });
  }
});