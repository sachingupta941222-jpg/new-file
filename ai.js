    const apiKey = "64dfd494f202c8ceedfd082cb1fdeaa9"; // Replace with your actual API key
    const cityInput = document.getElementById("cityInput");
    const getWeatherBtn = document.getElementById("getWeatherBtn");
    const weatherDisplay = document.getElementById("weatherDisplay");

    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value;
        if (city) {
            fetchWeatherData(city);
        } else {
            weatherDisplay.innerHTML = "<p>Please enter a city name.</p>";
        }
    });

    async function fetchWeatherData(city) {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Example for OpenWeatherMap

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            displayWeather(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherDisplay.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
        }
    }

    function displayWeather(data) {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;

        weatherDisplay.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
            <p>Humidity: ${humidity}%</p>
        `;
    }