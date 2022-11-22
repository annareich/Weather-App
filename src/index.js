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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = weekdayName[date.getDay()];
  return day;
}

function getForecast(city) {
  let apiKey = "3te3b7625d0o40110307d37f5202a805";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#forecast-weather");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-weekdays">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src="${forecastDay.condition.icon_url}"
                  alt=""
                  width="40"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-temperatures-max" id=forecast-max-${index}>${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
                  <span class="forecast-temperatures-min" id=forecast-min-${index}>${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
                </div>
              </div>
            `;
      celciusForecastMax[index] = forecastDay.temperature.maximum;
      celciusForecastMin[index] = forecastDay.temperature.minimum;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let city = response.data.city;
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;

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

  celciusTemperature = response.data.temperature.current;
  metricWindspeed = response.data.wind.speed;

  currentTemperatureElement.innerHTML = Math.round(celciusTemperature);
  currentCityElement.innerHTML = city;
  currentTimeElement.innerHTML = formatDate(response.data.time * 1000);
  currentWindspeedElement.innerHTML = `Wind: ${wind} km/h`;
  currentWeatherDescriptionElement.innerHTML = weatherDescription;
  currentWeatherIconElement.setAttribute(
    "src",
    `${response.data.condition.icon_url}`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.condition.description
  );
  getForecast(city);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  let apiKey = "3te3b7625d0o40110307d37f5202a805";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=${unit}`;
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function search(city) {
  let apiKey = "3te3b7625d0o40110307d37f5202a805";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handlePosition(position) {
  let myLatitude = position.coords.latitude;
  let myLongitude = position.coords.longitude;
  let apiKey = "3te3b7625d0o40110307d37f5202a805";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${myLongitude}&lat=${myLatitude}&key=${apiKey}&units=${unit}`;
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

  let imperialWindspeed = metricWindspeed / 1.609344;
  let windspeedElement = document.querySelector("#current-windspeed");
  windspeedElement.innerHTML = `Wind: ${Math.round(imperialWindspeed)} mph`;

  celciusForecastMax.forEach(function (forecast, index) {
    let forecastMaxElement = document.querySelector(`#forecast-max-${index}`);
    forecastMaxElement.innerHTML = `${Math.round(
      (celciusForecastMax[index] * 9) / 5 + 32
    )}°`;
  });
  celciusForecastMin.forEach(function (forecast, index) {
    let forecastMinElement = document.querySelector(`#forecast-min-${index}`);
    forecastMinElement.innerHTML = `${Math.round(
      (celciusForecastMin[index] * 9) / 5 + 32
    )}°`;
  });
}

function setUnitCelcius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let windspeedElement = document.querySelector("#current-windspeed");
  windspeedElement.innerHTML = `Wind: ${Math.round(metricWindspeed)} km/h`;

  celciusForecastMax.forEach(function (forecast, index) {
    let forecastMaxElement = document.querySelector(`#forecast-max-${index}`);
    forecastMaxElement.innerHTML = `${Math.round(celciusForecastMax[index])}°`;
  });
  celciusForecastMin.forEach(function (forecast, index) {
    let forecastMinElement = document.querySelector(`#forecast-min-${index}`);
    forecastMinElement.innerHTML = `${Math.round(celciusForecastMin[index])}°`;
  });
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
let metricWindspeed = null;

let celciusForecastMax = [];
let celciusForecastMin = [];

search("Stockholm");
