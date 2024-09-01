document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    const apiKey = '9210d956a23094b3d031661faa06cb76'; // Your OpenWeather API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherEmoji = getWeatherEmoji(data.weather[0].main);
                document.getElementById('weatherInfo').innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>${weatherEmoji} Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
                setBackgroundAnimation(data.weather[0].main);
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => {
            alert('Error fetching weather data. Please try again.');
            console.error('Error:', error);
        });

    // Fetch 5-day forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            let forecastHTML = '<h3>5-Day Forecast:</h3>';
            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) { // Show forecast for every 24 hours (8 * 3-hour intervals)
                    const forecastEmoji = getWeatherEmoji(forecast.weather[0].main);
                    forecastHTML += `
                        <div>
                            <h4>${new Date(forecast.dt_txt).toLocaleDateString()}</h4>
                            <p>${forecastEmoji} Temp: ${forecast.main.temp}°C</p>
                            <p>Weather: ${forecast.weather[0].description}</p>
                        </div>
                    `;
                }
            });
            document.getElementById('forecastContainer').innerHTML = forecastHTML;
        })
        .catch(error => {
            alert('Error fetching forecast data. Please try again.');
            console.error('Error:', error);
        });
});

function getWeatherEmoji(weatherMain) {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return '☀️'; // Sunny
        case 'clouds':
            return '☁️'; // Cloudy
        case 'rain':
            return '🌧️'; // Rain
        case 'thunderstorm':
            return '⛈️'; // Thunderstorm
        case 'snow':
            return '❄️'; // Snow
        case 'mist':
        case 'fog':
            return '🌫️'; // Mist/Fog
        default:
            return '🌈'; // Default/Unknown weather
    }
}

function setBackgroundAnimation(weatherMain) {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    backgroundAnimation.innerHTML = ''; // Clear previous animations

    switch (weatherMain.toLowerCase()) {
        case 'clear':
            createStars(50);
            break;
        case 'clouds':
            createClouds(5);
            break;
        case 'rain':
            createRain(100);
            break;
        case 'thunderstorm':
            createRain(100); // You can add lightning animations as well
            break;
        case 'snow':
            createSnow(50); // Implement snowflakes similar to rain
            break;
        case 'mist':
        case 'fog':
            createClouds(3); // Light fog effect
            break;
    }
}

function createClouds(number) {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    for (let i = 0; i < number; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = `${100 + Math.random() * 100}px`;
        cloud.style.height = `${50 + Math.random() * 50}px`;
        cloud.style.top = `${Math.random() * 100}%`;
        cloud.style.left = `${Math.random() * 100}%`;
        cloud.style.animationDuration = `${20 + Math.random() * 10}s`;
        backgroundAnimation.appendChild(cloud);
    }
}

function createRain(number) {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    for (let i = 0; i < number; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${0.5 + Math.random()}s`;
        drop.style.animationDelay = `${Math.random()}s`;
        backgroundAnimation.appendChild(drop);
    }
}

function createStars(number) {
    const backgroundAnimation = document.getElementById('backgroundAnimation');
    for (let i = 0; i < number; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;
        backgroundAnimation.appendChild(star);
    }
}

// Implement createSnow similar to createRain with different styles if needed
