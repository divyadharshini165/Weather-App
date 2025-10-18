const API_KEY = "7b9f99fd9af75f99c01c167c871b0f2c";

function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!username || !password) {
    document.getElementById("authMessage").textContent = "Please fill all fields!";
    return;
  }

  if (localStorage.getItem(username)) {
    document.getElementById("authMessage").textContent = "Username already exists!";
    return;
  }

  localStorage.setItem(username, password);
  document.getElementById("authMessage").textContent = "✅ Registration successful! Please login.";
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const storedPass = localStorage.getItem(username);
  const remember = document.getElementById("rememberMe").checked;

  if (storedPass && storedPass === password) {
    document.getElementById("authMessage").textContent = "✅ Login successful!";
    localStorage.setItem("loggedUser", username);

    if (remember) localStorage.setItem("rememberUser", username);

    document.getElementById("authContainer").style.display = "none";
    document.getElementById("weatherContainer").style.display = "block";
    document.getElementById("welcomeUser").textContent = `Welcome, ${username}!`;
  } else {
    document.getElementById("authMessage").textContent = "❌ Invalid credentials!";
  }
}

function logout() {
  localStorage.removeItem("loggedUser");
  document.getElementById("weatherContainer").style.display = "none";
  document.getElementById("authContainer").style.display = "block";
}

function autoLogin() {
  const remembered = localStorage.getItem("rememberUser");
  if (remembered) {
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("weatherContainer").style.display = "block";
    document.getElementById("welcomeUser").textContent = `Welcome back, ${remembered}!`;
  }
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
        <p>🌈 Description: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      `;
    } else {
      resultDiv.textContent = "City not found!";
    }
  } catch (error) {
    resultDiv.textContent = "Error fetching data.";
  }
}

autoLogin();
