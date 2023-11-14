// Functions
function changeCity (submit){
    submit.preventDefault();
    currentCity.innerHTML = `${currentCityInput.value}`;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCityInput.value}&key=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}`).then(changeWeather);
}

function updateTime (){
    if (hour < 10) {
        hour = `0${hours}`;
    }
    if (minutes < 10){
        minutes =`0${minutes}`;
    }
    dateElement.innerHTML =`${dow} ${hour}:${minutes}`;
}

function changeWeather (city) {
    currentCity.innerHTML = `${currentCityInput.value}`;
    currentWeatherNarrative.innerHTML = (city.data.condition.description);
    currentTemperature.innerHTML = Math.round(city.data.temperature.current);
    celsiusTemperature = city.data.temperature.current;
    currentHumidity.innerHTML = Math.round(city.data.temperature.humidity);
    currentWind.innerHTML = Math.round(city.data.wind.speed);
    iconElement.setAttribute ("src", city.data.condition.icon_url);
    iconElement.setAttribute ("alt", city.data.condition.icon);
    getForecast();
}

function convertToFahrenheit (event){
    event.preventDefault();
    celsiusConversion.classList.remove("celsius-conversion");
    fahrenheitConversion.classList.add("celsius-conversion");
    fahrenheitTemperature = Math.round((celsiusTemperature*9)/5+32);
    currentTemperature.innerHTML = `${fahrenheitTemperature}`;
}

function convertToCelsius (event){
    event.preventDefault();
    celsiusConversion.classList.add("celsius-conversion");
    fahrenheitConversion.classList.remove("celsius-conversion");
    celsiusTemperature = Math.round(celsiusTemperature);
    currentTemperature.innerHTML = celsiusTemperature;
}


function getForecast (city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCityInput.value}&key=${apiKey}&units=${units}`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast (city){
    console.log(city.data);
    let forecastHtml = "";
    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>15º </strong> I
            </div>
            <div class="weather-forecast-temperature"> 9º</div>
          </div>
        </div>
      `;
    });
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHtml;
  }

// Variables
let apiKey = "0e0ff2d19bf5c014ad22b48bt938314o";
let units = "metric";
let currentCityInput = document.querySelector("#cityInput");
let currentCity = document.querySelector(".current-city");
let currentTemperature = document.querySelector(".current-temperature");
let currentHumidity = document.querySelector(".current-humidity");
let currentWind = document.querySelector (".current-wind");
let currentWeatherNarrative = document.querySelector(".temperature-narrative");
let dateElement = document.querySelector (".date-element");
let now = new Date ();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let dow = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let searchForm = document.querySelector(".search-form");
let iconElement = document.querySelector("#icon");
let celsiusTemperature =null;
let fahrenheitConversion = document.querySelector(".fahrenheit-conversion");
let celsiusConversion = document.querySelector(".celsius-conversion");


// Befehle
updateTime();
searchForm.addEventListener("submit", changeCity);
fahrenheitConversion.addEventListener("click", convertToFahrenheit);
celsiusConversion.addEventListener("click", convertToCelsius);