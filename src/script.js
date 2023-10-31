// Functions
function changeWeather (response) {
    currentCity.innerHTML = `${city}`;
    currentWeatherNarrative.innerHTML = (response.data.condition.description);
    currentTemperature.innerHTML = Math.round(response.data.temperature.current);
    currentHumidity.innerHTML = Math.round(response.data.temperature.humidity);
    currentWind.innerHTML =Math.round(response.data.wind.speed);
}

// Variables
let apiKey = "0e0ff2d19bf5c014ad22b48bt938314o";
let units = "metric";
let city = "Lisbon";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
let currentTemperature = document.querySelector(".current-temperature");
let currentHumidity = document.querySelector(".current-humidity");
let currentWind = document.querySelector (".current-wind");
let currentCity = document.querySelector(".current-city");
let currentWeatherNarrative = document.querySelector(".temperature-narrative");


axios.get(`${apiUrl}`).then(changeWeather);