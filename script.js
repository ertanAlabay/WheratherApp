//api key
const apikey = "4c784fbf265311c8f6dac9676c359e66"


const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  //console.log(cityValue);
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
    
    if(!response.ok){
      throw new Error("Network response was not ok.");
    }
    const data = await response.json()
    //console.log(data)

    const temperature = Math.round(data.main.temp)
    const description = data.weather[0].description
    const icon = data.weather[0].icon
    const details = [
      `Hissedilen: ${Math.round(data.main.feels_like)}°C`,
      `Nem: ${data.main.humidity}%`,
      `Rüzgar Hızı: ${data.wind.speed} m/s`
    ]

    weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
    weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`
    weatherDataEl.querySelector(".description").textContent = description
    weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");



  } catch (error) {

    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent = "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.";
    weatherDataEl.querySelector(".details").innerHTML = "";
    
  }
}