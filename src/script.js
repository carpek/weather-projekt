// change date

function dayFormat(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = date.getDay();
    let currentDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let day = currentDays[days];
  
    return `${day} ${hours}:${minutes}`;
  }
  let currentDate = document.querySelector("#date");
  let currentTime = new Date();
  currentDate.innerHTML = dayFormat(currentTime);
  
  // Search city
  function showWeatherConditions(response) {
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#current-humidity").innerHTML = Math.round(
      response.data.main.humidity
    );
    document.querySelector("#current-wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function search(city) {
    let units = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = `a8b18d5e574b14c1d3de44331ec7e970`;
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}
    `;
  
    axios.get(apiUrl).then(showWeatherConditions);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    search(city);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  navigator.geolocation.getCurrentPosition(handleSubmit);
  
  search("New York");
  
  function fahrenheitClick(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("temperature");
    temperatureElement.innerHTML = navigator.geolocation.getCurrentPosition(
      showPosition
    );
  }
  
  function celicusClick(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("temperature");
    temperatureElement.innerHTML = navigator.geolocation.getCurrentPosition(
      showPosition
    );
  }
  
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("temperature");
    temperatureElement.innerHTML = temperature.value;
  }
  
  let fahrenheitTemperature = document.querySelector("#fahrenheit-temperature");
  fahrenheitTemperature.addEventListener("click", fahrenheitClick);
  
  let celciusTemperature = document.querySelector("#celcius-temperature");
  celciusTemperature.addEventListener("click", celicusClick);
  