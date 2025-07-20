function calculateWindChill(temperature, windSpeed) {
    return 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
}

function displayWeather() {
    const weatherData = document.getElementById('weather-data');

    const temperature = 11;
    const windSpeed = 19;

    let windChill = "N/A";

    if (temperature <= 10 && windSpeed > 4.8) {
        windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + "°C";
    }

    weatherData.innerHTML = `
        <p>Current: ${temperature}°C</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
        <p>Wind Chill: ${windChill}</p>
        <div class="weather-icon">☀️</div>
    `; 
}

window.addEventListener('load', displayWeather);