// change date
function dayFormat(date) {
    let date = new Date(date);

    let currentDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let days = currentDays[date.getDay()];
    return `${days} ${formatHours(date)}`;
  }

  // change time
  function formatHours(date) {
    let date = new Date(date);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return ` ${hours}:${minutes}`;
  }

 
  let currentDate = document.querySelector("#date");
 
  currentDate.innerHTML = dayFormat("#date");
  
  // change description
  
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
  
// display forcast of hourly weather

function displayForecast (response) {



}

// Search city & handle submit

  function search(city) {
    let apiKey = `a8b18d5e574b14c1d3de44331ec7e970`;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let units = "metric";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}
    `;
    axios.get(apiUrl).then(showWeatherConditions);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input");
    search(city.value);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  // display Elements in html 


 function showTemperature(response) {
    let temperatureElement = document.querySelector("temperature");
    celciusTemperatureDisplay = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celciusTemperatureDisplay);
 




}

 
 // display celcius & fahrenheit on click 


  function fahrenheitClick(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("temperature");
    celciusTemperature.classList.remove("units");
    fahrenheitTemperature.classList.add("units");

    let fahrenheit =  (celsiusTemperatureDisplay * 9) / 5 + 32;
   
    temperatureElement.innerHTML = Math.round(fahrenheit);
    
  }
  
  function celicusClick(event) {
    event.preventDefault();
    celciusTemperature.classList.add("units");
    fahrenheitTemperature.classList.remove("units");

    let temperatureElement = document.querySelector("temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperatureDisplay);
  }

  let celciusTemperatureDisplay =null;
  
 
  
  let fahrenheitTemperature = document.querySelector("#fahrenheit-temperature");
  fahrenheitTemperature.addEventListener("click", fahrenheitClick);
  
  let celciusTemperature = document.querySelector("#celcius-temperature");
  celciusTemperature.addEventListener("click", celicusClick);
  
  search("New York");