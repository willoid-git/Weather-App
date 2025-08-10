//city search, weather api, and display
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#currentTemp");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  let city = searchInputElement.value;
  let apiKey = "b24fe20t8363f64078b0a0fc75130afo";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

let citySearchForm = document.querySelector("#city-search");
citySearchForm.addEventListener("submit", search);

//date display

function formatDate(date) {
  let currentDay = date.getDay();
  let currentMonth = date.getMonth();
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  if (currentMinute < 10) {
    minutes = `0${minutes}`;
  }

  if (currentHour < 10) {
    hours = `0${hours}`;
  }

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

  let formattedDate = `${formattedDay}, ${formattedMonth} ${currentDate}, ${currentHour}:${currentMinute}`;

  return `${formattedDate}`;
}
