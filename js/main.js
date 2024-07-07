// Select necessary DOM elements for weather application functionality
const container = document.querySelector('.container')
const search = document.getElementById('searchBtn')
const weatherBox = document.getElementById('weatherBox')
const weatherDetails = document.getElementById('weatherDetails')
const error404 = document.querySelector('.not-found')


// Add an event listener to the search button for 'click' events
search.addEventListener('click', async () => {

    const ApiKey = '0c507daff9cab38171218118445a4adb'; // API key for OpenWeatherMap
    const city = document.querySelector('.search input').value; // Get the city name from the input field

    // If the city name is empty, do nothing
    if (city == '') {
        return
    }


    // Fetch weather data from OpenWeatherMap API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`)

    // Parse the JSON response from the API
    const json = await response.json()


    // If the city is not found, display the error message
    if (json.cod == '404') {
        // Adjust the container height to show the error message
        container.style.height = '400px'

        // Remove active class from weatherBox and weatherDetails to hide them
        weatherBox.classList.remove('active')
        weatherDetails.classList.remove('active')

        // Add active class to error404 to display the error message
        error404.classList.add('active')
        return
    }

    // Select elements for updating weather information
    const image = document.querySelector('.weather-box img')
    const temp = document.querySelector('.weather-box .temp')
    const desc = document.querySelector('.weather-box .desc')
    const humidity = document.querySelector('.weather-details .humidity span')
    const wind = document.querySelector('.weather-details .wind span')

    // Update the container height and display the weather information
    container.style.height = '555px'
    container.classList.add('active')
    weatherBox.classList.add('active')
    weatherDetails.classList.add('active')
    error404.classList.remove('active')

    // Update the weather icon based on the weather condition
    switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Mist':
        case 'Haze':
            image.src = 'images/mist.png';
            break;
        default:
            image.src = 'images/cloud.png';
            break;
    }

    // Update the weather information
    temp.innerHTML = `${Math.round(json.main.temp)} <span>°C</span>`;
    desc.innerText = json.weather[0].description;
    humidity.innerText = `${json.main.humidity}%`;
    wind.innerText = `${Math.round(json.wind.speed)} Km/h`;

})










