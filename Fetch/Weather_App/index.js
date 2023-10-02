let apiKey = "6c385b8e770ddeb8ca50f34e34a5f48a";
const date = new Date();
let searchButton = document.querySelector("input + button");
let userInput = document.querySelector("input");
let map = document.querySelector("iframe");
let displayArea = document.querySelector("#display > :first-child");

async function getCoordinates() {
  try {
    let res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
        userInput.value
      )}&limit=1&appid=${apiKey}`
    );
    let coordinatesData = await res.json();
    requestData(coordinatesData[0]);
  } catch (error) {
    console.log(error);
  }
}
searchButton.addEventListener("click", () => {
  map.src = `https://maps.google.com/maps?q=2880%20Broadway,${userInput.value}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  getCoordinates();
});

async function requestData(coordinates) {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
    );
    let data = await res.json();
    displayData(data);
  } catch (error) {
    console.log(error);
  }
}
function displayData(data) {
  displayArea.innerHTML = "";
  let currentDate = document.createElement("h3");
  let place = document.createElement("h2");
  let temperature = document.createElement("h1");
  let weatherIcon = document.createElement("img");
  let currentState = document.createElement("h3");
  let details = document.createElement("div");
  currentDate.innerText =
    date.toLocaleDateString("default", { month: "short" }) +
    " " +
    date.toLocaleDateString("default", { day: "numeric" }) +
    ", " +
    date.toLocaleTimeString("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  place.innerText = data.name + ", " + data.sys.country;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  temperature.append(weatherIcon, Math.floor(data.main.temp - 273.15) + "°C");
  currentState = `Feels like ${Math.floor(data.main.feels_like - 273.15)}°C. ${
    data.weather[0].main
  }. ${data.weather[0].description}`;
  details.innerHTML = `&#11018;${data.wind.speed}m/s WNW  &#9201;${
    data.main.pressure
  }hPa<br> Humidity: ${data.main.humidity}%<br> Dew Point: ${Math.floor(
    data.main.temp - 273.15 - (100 - data.main.humidity) / 5
  )}°C  Visibility:${(data.visibility / 1000).toFixed(1)}Km`;
  displayArea.append(currentDate, place, temperature, currentState, details);
}
