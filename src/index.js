function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekdayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = weekdayName[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let city = response.data.name;
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.weather[0].description;
  let currentCityElement = document.querySelector("#current-city");
  let currentTemperatureElement = document.querySelector(
    "#current-temperature-value"
  );
  let currentTimeElement = document.querySelector("#current-time");
  let currentWindspeedElement = document.querySelector("#current-windspeed");
  let currentWeatherDescriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  console.log(response.data);

  celciusTemperature = response.data.main.temp;

  currentTemperatureElement.innerHTML = Math.round(celciusTemperature);
  currentCityElement.innerHTML = city;
  currentTimeElement.innerHTML = formatDate(response.data.dt * 1000);
  currentWindspeedElement.innerHTML = `Wind: ${wind} km/h`;
  currentWeatherDescriptionElement.innerHTML = weatherDescription;
  currentWeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  console.log(
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function search(city) {
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handlePosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLatitude}&lon=${myLongitude}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function setCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function setUnitFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function setUnitCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let now = new Date();

let weekdayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekdayName[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}
let timeAnnouncement = document.querySelector(".current-time");
timeAnnouncement.innerHTML = `${day} ${hours}:${minutes}`;

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);

let currentLocationSearch = document.querySelector("button.location-button");
currentLocationSearch.addEventListener("click", setCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", setUnitFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", setUnitCelcius);

let celciusTemperature = null;

search("Stockholm");
