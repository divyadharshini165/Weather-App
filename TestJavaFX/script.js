console.log("API_KEY loaded:", typeof API_KEY !== "undefined" ? API_KEY : "undefined");

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  try {
    if (typeof API_KEY === "undefined") throw new Error("API_KEY is not defined! Check config.js");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

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
      resultDiv.textContent = `City not found! (${data.message})`;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    resultDiv.textContent = `Error fetching data: ${error.message}`;
  }
}
