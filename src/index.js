function refreshWeather(response) {
    temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let feels_likeElement = document.querySelector("#feels-like");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date();
    let day = weekday[d.getDay()];

    console.log(response.data);

    cityElement.innerHTML = response.data.city;
    document.getElementById("weekday").innerHTML = day;
    temperatureElement.innerHTML = Math.round(temperature);
    feels_likeElement.innerHTML = Math.round(response.data.temperature.feels_like) + "°";
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity + "%";
    windElement.innerHTML = response.data.wind.speed + "km/h";
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"></img>`;

    getForecast("respose.data.city");
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

function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    
    axios(apiUrl).then(displayForecast);

    console.log(apiUrl);
}


function displayForecast(response) {
    console.log(response.data);



    let forecast = document.querySelector("#forecast");
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let forecastHtml = " ";

    days.forEach(function (day) {
        forecastHtml =
          forecastHtml + `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15°</strong>
          </div>
          <div class="weather-forecast-temperature">9°</div>
        </div>
      </div>
    `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
 
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handleSearchSubmit);

searchCity("Oslo");

