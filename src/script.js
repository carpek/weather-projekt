// change date to weekday
function dayFormat(dates) {
    let date = new Date(dates);

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
    return `${days} ${formatHours(dates)}`;
  }

  // change time
  function formatHours(dates) {
    let date = new Date(dates);
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

  
  // display Elements in html 

 function showTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#current-humidity");
    let windElement = document.querySelector("#current-wind");
    let currentDate = document.querySelector("#date");

    celciusTemperatureDisplay = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemperatureDisplay);    
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    currentDate.innerHTML = dayFormat(response.data.dt*1000);

}

// display forcast of hourly weather

function displayForecast (response) {

  let  forecastElement = document.querySelector("#forcast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML += `

  <div class="col">
      <div class="cardSmall">
          <div class="card-body">
          ${formatHours(forecast.dt*1000)}
          
          <img
              src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon}@2x.png"
              />

          <span class="forcast-temperature">
               <strong>${Math.round(forecast.main.temp_max)}°
               </strong>
               
               ${Math.round(forecast.main.temp_min)}
          
               </span>
          </div>        
      </div>
  </div> `;}

  }


// Search city & handle submit

function search(city) {
  let apiKey = `a8b18d5e574b14c1d3de44331ec7e970`;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

}

function handleSubmit(event) {
  event.preventDefault();
  let cityElementSearch = document.querySelector("#search-input");
  search(cityElementSearch.value);
}

 // display celcius & fahrenheit on click 


  function fahrenheitClick(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    
    celciusTemperature.classList.remove("units");
    fahrenheitTemperature.classList.add("units");

    let fahrenheit =  (celciusTemperatureDisplay * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheit);
  }
  
  function celicusClick(event) {
    event.preventDefault();

    celciusTemperature.classList.add("units");
    fahrenheitTemperature.classList.remove("units");

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperatureDisplay);
  }

  let celciusTemperatureDisplay = null;

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let fahrenheitTemperature = document.querySelector("#fahrenheit-temperature");
  fahrenheitTemperature.addEventListener("click", fahrenheitClick);
  
  let celciusTemperature = document.querySelector("#celcius-temperature");
  celciusTemperature.addEventListener("click", celicusClick);
  
  search("Vienna");