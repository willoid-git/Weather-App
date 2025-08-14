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
}

//date display

function formatDate(date) {
  let currentDay = date.getDay();
  let currentMonth = date.getMonth();
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  if (currentHour < 10) {
    hours = `0${hours}`;
  }

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

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", handleSearchSubmit);

citySearch("Nelson");
