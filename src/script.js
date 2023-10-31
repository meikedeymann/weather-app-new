// Functions
function changeWeather (response) {
    console.log (response.data.city);
}

// Variables
let apiKey = "0e0ff2d19bf5c014ad22b48bt938314o";
let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=${units}`;


axios.get(`${apiUrl}`).then(changeWeather);