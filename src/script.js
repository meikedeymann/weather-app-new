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

// Forecast JS
function getForecast (city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${currentCityInput.value}&key=${apiKey}&units=${units}`;
    axios(apiUrl).then(displayForecast);
}

function formatDay (timestamp) {
    let date = new Date(timestamp * 1000);
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return day [date.getDay()]
}

function displayForecast (response){
    console.log(response.data);
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
        if (index <5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" width="90%"/>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong> ${Math.round(day.temperature.maximum)}º </strong> I
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>
      `;
    }
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