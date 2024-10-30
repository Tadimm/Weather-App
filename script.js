import APIKey from "./config.js";

const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

const displayError = () => {
  container.style.height = "400px";
  weatherBox.classList.remove("active");
  weatherDetails.classList.remove("active");
  error.classList.add("active");
};

const updateWeatherUI = (json) => {
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  container.style.height = "555px";
  weatherBox.classList.add("active");
  weatherDetails.classList.add("active");
  error.classList.remove("active");

  switch (json.weather[0].main) {
    case "Clear":
      image.src = "./images/clear.png";
      break;

    case "Rain":
      image.src = "./images/rain.png";
      break;

    case "Snow":
      image.src = "./images/snow.png";
      break;

    case "Clouds":
      image.src = "./images/cloud.png";
      break;

    case "Mist":
      image.src = "./images/mist.png";
      break;

    case "Haze":
      image.src = "./images/mist.png";
      break;

    default:
      image.src = "./images/cloud.png";
  }

  temperature.innerHTML = `${parseInt(json.main.temp)}<span>&deg;C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  humidity.innerHTML = `${json.main.humidity}%`;
  wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
};

const fetchWeather = () => {
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        displayError();
        return;
      }

      if (json.weather && json.weather.length > 0) {
        updateWeatherUI(json);
      } else {
        displayError();
      }
    })
    .catch((error) => {
      displayError();
    });
};

searchButton.addEventListener("click", fetchWeather);

searchInput.addEventListener("keypress", (ev) => {
  if (ev.key === "Enter") {
    fetchWeather();
    searchInput.blur();
  }
});

searchInput.addEventListener("focus", () => {
  searchInput.value = "";
});
