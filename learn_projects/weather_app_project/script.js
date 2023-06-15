// state
let currentCity = "Cincinnati";
let units = "metric";

// getting the html element
let city = document.querySelector(".heading-primary");
let dateTime = document.querySelector(".loc-time-description");
let wForecast = document.querySelector(".btn--clouds"); // HERE TOO
let wtemperature = document.querySelector(".temp-number");
let wIcon = document.querySelector(".weather-forecast-img");
let wMinMax = document.querySelector(".min-max");
let wRealFeel = document.querySelector(".real-temp-deg");
let wHumdity = document.querySelector(".humidity-temp-deg");
let wSpeedWind = document.querySelector(".wind-temp-deg");
let wPressure = document.querySelector(".pressure-temp-deg");

// search
document.querySelector(".weather-search").addEventListener("submit", (e) => {
  let search = document.querySelector(".weather-search-form");
  // prevent default action
  e.preventDefault();
  // change current city
  currentCity = search.value;
  // get wether forecast
  getWeather();
});

// converting time
function convertTime(tStamp, tZone) {
  const convertTimezone = tZone / 3600; // convert second to hours
  const date = new Date(tStamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

// getting country full name
function fullNameCountry(country) {
  let countryName = new Intl.DisplayNames(["en"], { type: "region" });
  return countryName.of(country);
}

function getWeather() {
  const myApi = "0a966317416fa355b816a4ed05ae6c6f"; // api key

  //   get the data from open api
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${myApi}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      city.innerHTML = `${data.name},${fullNameCountry(data.sys.country)}`;
      dateTime.innerHTML = convertTime(data.dt, data.timezone);
      wForecast.innerHTML = `${data.weather[0].main}`; // SOMETING MIGHT ERROR HERE
      wtemperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
      wIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather forecast image">`;
      wMinMax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176<p><p>Max: ${data.main.temp_max.toFixed()}&#176<p>`;
      wRealFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
      wHumdity.innerHTML = `${data.main.humidity.toFixed()}%`;
      wSpeedWind.innerHTML = `${data.wind.speed} m/s`;
      wPressure.innerHTML = `${data.main.pressure} hPa`;
    });
}

document.body.addEventListener("load", getWeather());
