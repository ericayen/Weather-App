let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function addZero(time) {
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}
let day = days[now.getDay()];
let hour = addZero(now.getHours());
let minutes = addZero(now.getMinutes());
let dateFormat = `${day} ${hour}:${minutes}`;

function replaceText(event) {
  event.preventDefault();
  let searchDate = document.querySelector(".search-date");
  searchDate.innerHTML = `${dateFormat}`;
}

let buttonClick = document.querySelector("#search-button");
buttonClick.addEventListener("click", replaceText);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let cityName = response.data.name;
  let currentTemp = document.querySelector("#deg-temp");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");
  let city = document.querySelector("#city");
  currentTemp.innerHTML = `${temperature}°`;
  highTemp.innerHTML = `${high}°`;
  lowTemp.innerHTML = `${low}°`;
  city.innerHTML = `${cityName}`;
}

function geoPosition(response) {
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  let apiKey = "99155108661d7dd4503fb67dfa97d58f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(geoPosition);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoPosition);
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getPosition);

function citySearch(response) {
  let city = document.getElementById("search-bar").value;
  city = city.toLowerCase();
  let apiKey = "99155108661d7dd4503fb67dfa97d58f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    document.querySelector("#search-button").click();
  }
});

let searchLocation = document.querySelector("#search-button");
searchLocation.addEventListener("click", citySearch);
