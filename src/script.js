// Functions
function changeWeather (response) {
    curentCity.innerHTML = `${city}`;
    currentTemperature.innerHTML = Math.round(response.data.temperature.current);
    currentHumidity.innerHTML = Math.round(response.data.temperature.humidity);
    currentWind.innerHTML =Math.round(response.data.wind.speed);
}

// Variables
let apiKey = "0e0ff2d19bf5c014ad22b48bt938314o";
let units = "metric";
let city = "Hamburg";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
let currentTemperature = document.querySelector(".current-temperature");
let currentHumidity = document.querySelector(".current-humidity");
let currentWind = document.querySelector (".current-wind");
let curentCity = document.querySelector(".current-city");


axios.get(`${apiUrl}`).then(changeWeather);