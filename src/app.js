//weather display
function refreshWeather(response) {
  let temperatureElement = document.querySelector("#currentTemp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#currentCity");
  let currentPrecipElement = document.querySelector("#currentPrecipitation");
  let currentHumidityElement = document.querySelector("#currentHumidity");
  let currentWindSpeedElement = document.querySelector("#currentWindSpeed");
  let dateElement = document.querySelector("#currentDate");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#currentTempIcon");

  cityElement.innerHTML = response.data.city;

  dateElement.innerHTML = formatDate(date);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  temperatureElement.innerHTML = Math.round(temperature);
  currentPrecipElement.innerHTML = response.data.condition.description;
  currentHumidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  currentWindSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  getForecast(response.data.city);
}

//date display

function formatDate(date) {
  let currentDay = date.getDay();
  let currentMonth = date.getMonth();
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  //if (currentHour < 10) {hours = `0${hours}`;}

  //if (currentMinute < 10) {minutes = `0${minutes}`;}

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formattedDay = days[currentDay];
  let formattedMonth = months[currentMonth];

  let formattedDate = `${currentHour}:${currentMinute} ${formattedDay}, ${formattedMonth} ${currentDate}`;

  return `${formattedDate}`;
}

//city search

function citySearch(city) {
  let apiKey = "b24fe20t8363f64078b0a0fc75130afo";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  citySearch(searchInput.value);
}
//forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b24fe20t8363f64078b0a0fc75130afo";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
            <div class="weather-forecast-day">   
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon" />
              <div class="weather-forecast-temps">
                <div class="weather-forecast-temps-max">${Math.round(
                  day.temperature.maximum
                )}°</div>
                <div class="weather-forecast-temps-min">${Math.round(
                  day.temperature.minimum
                )}°</div>
              </div>
            </div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", handleSearchSubmit);

document.addEventListener("DOMContentLoaded", () => {
  citySearch("Nelson");
});
