function refreshWeather(response) {
    temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let feels_likeElement = document.querySelector("#feels-like");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.getElementById("time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

 
    console.log(response.data);

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"></img>`;
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    temperatureElement.innerHTML = Math.round(temperature) + "°";
    feels_likeElement.innerHTML = Math.round(response.data.temperature.feels_like) + "°";
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity + "%";
    windElement.innerHTML = response.data.wind.speed + "km/h";
}


function searchCity(city) {
    let apiKey = "ec4af4682fo7f33ba0a6ate4046d3b06";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;

    axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handleSearchSubmit);

searchCity("Oslo");
