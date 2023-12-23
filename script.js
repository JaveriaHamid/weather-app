const inputBox = document.querySelector(".search-box");
const searchBtn = document.getElementById('search-Btn');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');
const container = document.querySelector('.container');
const humidityActive = document.querySelector('.humidity');
const windActive = document.querySelector('.wind');
const weatherDetails = document.querySelector('.weather-details');


async function checkWeather(city){
    const api_key = "b579c816212adc7a2149c27be94b6932";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    
    const weather_data = await fetch(`${url}`).then(response => response.json());
    console.log(weather_data);

    if(weather_data.cod === '404'){
        container.style.height = '370px';
        location_not_found.classList.add('active');
        weatherBody.classList.remove('active');
        weatherDetails.classList.remove('active');

        return;
    };

    container.style.height = '520px';
    
    location_not_found.classList.remove('active');
    weatherBody.classList.add('active');
    weatherDetails.classList.add('active');


    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/h`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "images/clouds.png";
            break;
        case 'Clear':
            weather_img.src = "images/clear.png";
            break;
        case 'Rain':
            weather_img.src = "images/rain.png";
            break;
        case 'Mist':
            weather_img.src = "images/mist.png";
            break;
        case 'Snow':
            weather_img.src = "images/snow.png";
            break;
        default:
            weather_img.src = "images/clouds.png";
    };
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(inputBox.value);
});