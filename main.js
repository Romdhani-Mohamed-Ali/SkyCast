const apiKey = "343e2538bce574127307db3a7f6176df";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBtn = document.querySelector("#search-button");
const cityInput = document.querySelector("#city-input");
const weatherInfo = document.getElementById("weather-info");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Log the data to check its structure
        localStorage.setItem("weatherData", JSON.stringify(data));
        document.getElementById("degree").textContent = Math.round(data.main.feels_like) + "°";
        document.getElementById("city-name").textContent = data.name; // Update the city name
        const weather = data.weather[0].main; // Update the description
        document.getElementById("description").textContent = weather; // Update the description

        const icon = document.querySelector("#icon");
        if (weather === "Clouds" || weather === "Cloudy") {
            icon.setAttribute("src", "img/cloudy.png");
        } else if (weather === "Clear") {
            icon.setAttribute("src", "img/clear.png");
        } else {
            icon.setAttribute("src", "img/default.png"); // Add a default icon for other weather types
        }

        // Show the weather info with a scale-up effect
        weatherInfo.style.display = "grid"; // Change display to grid
        weatherInfo.classList.remove("opacity-0", "translate-y-4");
        weatherInfo.classList.add("opacity-100", "translate-y-0");
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please check the city name or try again later.");
    }
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const city = cityInput.value.trim(); // Use value property to get the input and trim whitespace
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
