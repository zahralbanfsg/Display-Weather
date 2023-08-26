"use strict"
let cityOrCountryName = document.querySelector("input");
let dateOrDay = new Date()
let dayName;
let dayNumber;
let monthName;
let yearNumber;


cityOrCountryName.addEventListener("input", getData);

async function getData() {
    if (cityOrCountryName.value !== "") {
        let weatherDataInfo = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=47bee704de7b450f831144121232008&days=4&q=${cityOrCountryName.value}`);
        let data = await weatherDataInfo.json();
        if (!data.error) {
            let dailyWeather = data.forecast.forecastday;
            let currentWeather = data.current;
            let location = data.location;
            let displayData = ``;
            dateOrDay = new Date(dailyWeather[0].date);
            displayDate()
            let displayCurrentData = `<div class="text-center mb-2">
            <h1 class="fw-bold">${location.name}</h1>
        </div>
        <div class="p-2 text-center currentBoxInfo">
            <div class="d-flex justify-content-center align-items-center mb-2 text-center">
                <p class="me-3">${dayName}</p>
                <p class="date">${dayNumber} ${monthName} ${yearNumber}</p>
            </div>
            <div class="d-flex justify-content-center align-items-center mb-3">
                <h2 class="me-2">${currentWeather.temp_c}&deg;C</h2>
                <img src="${currentWeather.condition.icon}" alt="weather-icon">
            </div>
            <p class="mb-3 text-center fw-bold">${currentWeather.condition.text}</p>
            <div class="d-flex justify-content-center align-items-center currantDetails">
                <div class="d-flex justify-content-center align-items-center me-3">
                    <img src="./images/icon-umberella.png" alt="icon-umberella" class="me-1">
                    <p class="mb-0">${dailyWeather[0].day.daily_chance_of_rain}%</p>
                </div>
                <div class="d-flex justify-content-center align-items-center me-3">
                    <img src="./images/icon-wind.png" alt="icon-wind" class="me-1">
                    <p class="mb-0">${currentWeather.wind_kph}km/h</p>
                </div>
                <div class="d-flex justify-content-center align-items-center me-3">
                    <img src="./images/icon-compass.png" alt="icon-compass" class="me-1">
                    <p class="mb-0">${currentWeather.wind_degree}&deg; ${currentWeather.wind_dir}</p>
                </div>
            </div>
        </div>
        `
            for (let i = 1; i < dailyWeather.length; i++) {
                dateOrDay = new Date(dailyWeather[i].date);
                displayDate()
                displayData += `
        <div class="p-3 me-1 dailyWeatherInfo">
            <div class="d-flex justify-content-around align-items-center mb-2 text-center">
                <p class="ms-2">${dayName}</p>
                <p>${dayNumber} ${monthName} ${yearNumber}</p>
            </div>
            <div class="d-flex justify-content-around align-items-center mb-3">
                <p class="me-2 text-center">Max.Temp. <br> ${dailyWeather[i].day.maxtemp_c}&deg;C</p>
                <p class="me-2 text-center">Min.Temp. <br>${dailyWeather[i].day.mintemp_c}&deg;C</p>
            </div>
            <div class="d-flex justify-content-center align-items-center mb-3">
            <p class="text-center fw-bold">${dailyWeather[i].day.condition.text}</p>
            <img src="${dailyWeather[i].day.condition.icon}" alt="weather-icon">
            </div>
            <div class="d-flex justify-content-around align-items-center">
                <div class="d-flex justify-content-center align-items-center me-lg-3">
                    <img src="./images/icon-umberella.png" alt="icon-umberella" class="me-1">
                    <p class="mb-0">${dailyWeather[i].day.daily_chance_of_rain}%</p>
                </div>
                <div class="d-flex justify-content-center align-items-center me-lg-3">
                    <img src="./images/icon-wind.png" alt="icon-wind" class="me-1">
                    <p class="mb-0 text-center">Max. Wind <br> ${dailyWeather[i].day.maxwind_kph}km/h</p>
                </div>
            </div>
        </div>
        `
            }
            document.getElementById('dailyWeather').innerHTML = displayCurrentData;
            document.getElementById('futureDailyWeather').innerHTML = displayData;
        }
    } else {
        cityOrCountryName.value = "cairo";
        getData()
        cityOrCountryName.value = "";
    }
}

function displayDate() {
    dayName = dateOrDay.toLocaleDateString("en-us", { weekday: "long" });
    dayNumber = dateOrDay.getDate();
    monthName = dateOrDay.toLocaleDateString("en-us", { month: "long" });
    yearNumber = dateOrDay.toLocaleDateString("en-us", { year: "numeric" });
}

function getCurrentWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (currentPosition) {
            console.log(currentPosition);
            getData(
                [
                    currentPosition.coords.latitude,
                    currentPosition.coords.longitude,
                ].join(",")
            );
        });
    }
}

async function displayAllData() {
    await getData();
    getCurrentWeather();
}

displayAllData();

