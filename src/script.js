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

function changeWeather (response) {
    currentCity.innerHTML = `${currentCityInput.value}`;
    currentWeatherNarrative.innerHTML = (response.data.condition.description);
    currentTemperature.innerHTML = Math.round(response.data.temperature.current);
    celsiusTemperature = response.data.temperature.current;
    currentHumidity.innerHTML = Math.round(response.data.temperature.humidity);
    currentWind.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute ("src", response.data.condition.icon_url);
    iconElement.setAttribute ("alt", response.data.condition.icon);
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
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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