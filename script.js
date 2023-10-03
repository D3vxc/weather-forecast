let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById("error-message"); // Add error message element

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const city = searchInput.value;
  if (city.trim() !== "") {
    await getWeather(city);
    searchInput.value = "";
  }
});

const getWeather = async (city) => {
  try {
    errorMessage.textContent = ""; // Clear any previous error message

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8df7c7437c81d0a52c344deedf70f4c`
    );
    const weatherData = await response.json();
    console.log(weatherData);

    const { name } = weatherData;
    const { feels_like } = weatherData.main;
    const { id, main } = weatherData.weather[0];

    loc.textContent = name;
    climate.textContent = main;
    tempvalue.textContent = Math.round(feels_like - 273);

    if (id < 200) {
      tempicon.src = "icons/storm.png";
    } else if (id < 300) {
      tempicon.src = "icons/drizzle.png";
    } else if (id < 600) {
      tempicon.src = "icons/rain.png";
    } else if (id < 700) {
      tempicon.src = "icons/snow.png";
    } else if (id === 800) {
      tempicon.src = "icons/sun.png";
    } else {
      tempicon.src = "icons/cloud.png";
    }
  } catch (error) {
    errorMessage.textContent = "City not found.";
  }
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c8df7c7437c81d0a52c344deedf70f4c`;

      try {
        const response = await fetch(api);
        const data = await response.json();

        const { name } = data;
        const { feels_like } = data.main;
        const { id, main } = data.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);
        errorMessage.textContent = ""; // Clear any previous error message

        if (id < 200) {
          tempicon.src = "icons/storm.png";
        } else if (id < 300) {
          tempicon.src = "icons/drizzle.png";
        } else if (id < 600) {
          tempicon.src = "icons/rain.png";
        } else if (id < 700) {
          tempicon.src = "icons/snow.png";
        } else if (id === 800) {
          tempicon.src = "icons/sun.png";
        } else {
          tempicon.src = "icons/cloud.png";
        }
      } catch (error) {
        errorMessage.textContent =
          "Failed to fetch weather data based on your location."; // Display error message
      }
    });
  }
});
