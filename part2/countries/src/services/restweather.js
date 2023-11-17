import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = process.env.WEATHER_KEY

const getCountryWeather = (lat, lon) => {
    return axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}

const exports = {getCountryWeather};
export default exports