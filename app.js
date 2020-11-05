// api key : 82005d27a116c2880c8f0fcb866998a0    53df9f6e7416b3add78dcac8108bcb0e     9185190de3ee1ffbe5552458a9a01231

//SELECT ELEMENT-------------------------------
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//AAP DATA-----------------------------------
const weather = {}
weather.temperature = {
    unit: "celsius"
}

//APP CONSTS AND VARS-------------------------------------
const KELVIN = 273;
//API KEY------------------------------------
const key = "82005d27a116c2880c8f0fcb866998a0";

//CHECK IF BROWSER SUPPORTS GEOLOCATION--------------------------------
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doen't support Geolocation</p>";
}

//SET USER'S POSOTION----------------------------------------
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//SHOW ERROR IF ANY WITH GEOLOCATION SERVICE--------------------------
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//GET WEATHER FROM API--------------------
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    // console.log(api);
    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].icon;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.country;
        })
        .then(function() {
            displayWeather();
        });
}

//DISPLAY WEATEHR TO USER INTERFACE-----------------------
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}

//C TO F CONVERSION-----------------------------------
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//WHEN USR CLICK ON TEMPERATURE ELEMENT ----------------------------
tempElement.addEventListener("click", function() {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}&#176;<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}&#176;<span>C</span>`;
        weather.temperature.unit == "celsius"
    }
})

//FOR MANAGING LOCATION ------------------------------
//var TextLabel = document.createElement("label");