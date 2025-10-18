// --- Switch between login and register forms ---
function toggleForm(form) {
  if (form === "register") {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
  } else {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
}

// --- Register a new user ---
function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const message = document.getElementById("authMessage");

  if (!username || !password) {
    message.textContent = "⚠️ Please fill in all fields!";
    message.style.color = "red";
    return;
  }

  if (localStorage.getItem(username)) {
    message.textContent = "❌ Username already exists!";
    message.style.color = "red";
    return;
  }

  localStorage.setItem(username, password);
  message.textContent = "✅ Registration successful! Please login.";
  message.style.color = "green";
  toggleForm("login");
}

// --- Login an existing user ---
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const storedPass = localStorage.getItem(username);
  const remember = document.getElementById("rememberMe").checked;
  const message = document.getElementById("authMessage");

  if (storedPass && storedPass === password) {
    localStorage.setItem("loggedUser", username);
    if (remember) {
      localStorage.setItem("rememberUser", username);
    }
    message.textContent = "✅ Login successful! Redirecting...";
    message.style.color = "green";

    // Redirect to weather page after short delay
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "❌ Invalid username or password!";
    message.style.color = "red";
  }
}
