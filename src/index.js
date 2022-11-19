function showWeather(response) {
  let city = response.data.name;
  let currentCity = document.querySelector(".city");
  currentCity.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector(".temperature-value");
  cityTemperature.innerHTML = `${temperature}°C`;
}

function searchCity() {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
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
if (minutes <= 9) {
  minutes = "0" + minutes;
}
let timeAnnouncement = document.querySelector(".time");
timeAnnouncement.innerHTML = `${day} ${hours}:${minutes}`;

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", searchCity);

let currentLocationSearch = document.querySelector("button.location-button");
currentLocationSearch.addEventListener("click", setCurrentLocation);
