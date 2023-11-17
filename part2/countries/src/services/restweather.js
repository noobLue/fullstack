import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = "86145b6e88aa078f29aeb256704b2fcb" // process.env.WEATHER_KEY

const getCountryWeather = (lat, lon) => {
    if(!lat)
    {
        console.error("Called without lat/long");
    }
    console.log(apiKey);
    return axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}

const exports = {getCountryWeather};
export default exports