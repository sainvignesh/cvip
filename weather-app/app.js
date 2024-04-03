const API_KEY = "776ea8697d05fab658a0a67315b14cce";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchInput = document.getElementById("input-box");

// Event Listener Function on keypress
searchInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getWeatherReport(searchInput.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((weather) => {
      console.log(weather); // Log the entire weather data
      showWeatherReport(weather);
    });
}

// Show Weather Report
function showWeatherReport(weather) {
  const {
    name,
    sys,
    main,
    wind,
    weather: [currentWeather],
  } = weather;

  const cityElement = document.getElementById("city");
  cityElement.innerText = `${name}, ${sys.country}`;

  const temperatureElement = document.getElementById("temp");
  temperatureElement.innerHTML = `${Math.round(main.temp)}&deg;C`;

  const humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `Humidity: ${main.humidity}%`;

  const windSpeedElement = document.getElementById("wind-speed");
  windSpeedElement.innerHTML = `Wind Speed: ${wind.speed} m/s`;

  const weatherTypeElement = document.getElementById("weather");
  weatherTypeElement.innerText = currentWeather.main;

  const dateElement = document.getElementById("date");
  dateElement.innerText = formatDate(new Date());

  setBackgroundImage(currentWeather.main);
}

// Set Background Image
function setBackgroundImage(weatherType) {
  const backgroundImageMap = {
    Clear: "clear.jpg",
    Clouds: "cloudy.jpg",
    Haze: "haze.jpg",
    Rain: "rainy.jpg",
    Snow: "snow.jpg",
    Thunderstorm: "thunderstrom.jpg",
    Sunny: "sunny.jpg",
  };

  document.querySelector(
    ".app-main"
  ).style.backgroundImage = `url('./assets/${backgroundImageMap[weatherType]}')`;
}

// Format Date
function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const day = days[date.getDay()];

  return `${dateNum} ${month} (${day}), ${year}`;
}
