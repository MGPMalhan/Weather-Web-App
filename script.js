// Select elements
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", () => {
  const APIKey = "ff0a6d2df3a0052cd63e47d444916d8f";
  const city = document.querySelector(".search-box input").value.trim(); // Trim whitespace

  if (city === "") {
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update DOM elements with fetched weather data
      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(
        ".weather-box .weather-status"
      );
      const country = document.querySelector(".weather-box .country");
      const humidity = document.querySelector(
        ".weather-details .Humidity .infro-wind p"
      );
      const windSpeed = document.querySelector(
        ".weather-details .wind .infro-wind p"
      );

      // Update the image source based on the weather condition
      const weatherCondition = data.weather[0].main.toLowerCase();
      switch (weatherCondition) {
        case "clear":
          image.src = "imgs/Sunny.png";
          break;
        case "rain":
          image.src = "imgs/Rainy2.png";
          break;
        case "clouds":
          image.src = "imgs/Cloudy.png";
          break;
        case "snow":
          image.src = "imgs/Snow.png";
          break;
        default:
          image.src = "imgs/Default.png";
          break;
      }

      // Update other weather information
      temperature.innerHTML = `${Math.round(data.main.temp)}&deg;`;
      description.textContent =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);
      country.textContent = data.sys.country;

      humidity.textContent = `${data.main.humidity}%`;
      windSpeed.textContent = `${data.wind.speed} m/s`;

      // Trigger animation by adding a class
      weatherBox.classList.add("animate");
      weatherDetails.classList.add("animate");

      // Remove animation class after a delay (to reset for future updates)
      setTimeout(() => {
        weatherBox.classList.remove("animate");
        weatherDetails.classList.remove("animate");
      }, 500); // Adjust timing to match your CSS transition duration
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
});
