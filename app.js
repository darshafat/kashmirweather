document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    const apiKey = '9210d956a23094b3d031661faa06cb76
'; // Your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {  // Success response
                const weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            } else {  // API error response
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            alert(`Error fetching weather data: ${error.message}`);
            console.error('Fetch error:', error);
        });
});
