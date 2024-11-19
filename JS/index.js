//variables
const searchLocation = document.getElementById("searchLocation");
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
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    getWeatherData(`${lat},${long}`);
  });
} else {
  alert("GPS doesn't work on your PC, you could search manually for now!");
}

async function getWeatherData(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=38c23a3890c24ac88ed185336243006`
  );
  let data = await res.json();
  displayCurrentWeather(data);
  displayTomorrowWeather(data);
  displayAfterTomorrowWeather(data);
}

searchLocation.addEventListener("keyup", function (e) {
  getWeatherData(e.target.value);
});

function displayCurrentWeather(data) {
  let date = new Date(data.current.last_updated);
  let todayWeekDay = date.toLocaleString("en-us", { weekday: "long" });
  let todayMonth = date.toLocaleString("en-us", { month: "long" });
  let todayDay = date.getDate();
  dayToday.innerHTML = todayWeekDay;
  dateToday.innerHTML = todayDay + " " + todayMonth;
  cityToday.innerHTML = data.location.name;
  degreeToday.innerHTML = data.current.temp_c;
  conditionToday.innerHTML = data.current.condition.text;
  imgToday.setAttribute("src", data.current.condition.icon);
  humidityToday.innerHTML = data.current.humidity;
  winSpeedToday.innerHTML = data.current.wind_kph;
  windDirectionToday.innerHTML = data.current.wind_dir;
}

function displayTomorrowWeather({ forecast }) {
  tomorrowday.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString(
    "en-us",
    {
      weekday: "long",
    }
  );
  tomorrowIcon.setAttribute("src", forecast.forecastday[1].day.condition.icon);
  highDegTom.innerHTML = forecast.forecastday[1].day.maxtemp_c;
  lowDegTom.innerHTML = forecast.forecastday[1].day.mintemp_c;
}
function displayAfterTomorrowWeather({ forecast }) {
  afterTomorrowday.innerHTML = new Date(
    forecast.forecastday[2].date
  ).toLocaleString("en-us", { weekday: "long" });
  afterTomorrowIcon.setAttribute(
    "src",
    forecast.forecastday[2].day.condition.icon
  );
  highDegAfTom.innerHTML = forecast.forecastday[2].day.maxtemp_c;
  lowDegAfTom.innerHTML = forecast.forecastday[2].day.mintemp_c;
}
