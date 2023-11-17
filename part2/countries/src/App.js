import { useState, useEffect } from 'react'
import restcountries from './services/restcountries'
import restweather from './services/restweather'

const kelvinConversion = 273.15

const Weather = ({capital, weatherData}) => {
  return (<div>
    <h2>Weather in {capital}</h2>
    <div>Temperature {Math.round(weatherData.main.temp - kelvinConversion, 2)} Celsius</div>
    {weatherData.weather.map(w => {
      return (<img key={w.icon} src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`} alt={w.description}></img>)
    })}
    <div>Wind {weatherData.wind.speed} m/s</div>
  </div>)
}

const Country = ({country, weatherData}) => {

  return (
    <div>
      <h1>{country.name.common}</h1>

      
      capital {country.capital.length > 0 ? country.capital[0] : "not found"} <br/>
      area {country.area}<br/>

      <h3>languages: </h3>

      <ul>
      {Object.entries(country.languages).map(d => {
        return (
        <li key={d[1]}>
          {d[1]}
        </li>)
      })}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt}></img>

      {country.capital.length > 0 && weatherData ? <Weather capital={country.capital[0]} weatherData={weatherData}></Weather> : ""}
      
    </div>
  )
}

const Countries = ({countries, forceCountry, forceCallback, weatherData}) => {
  if(countries.length > 10)
  {
    return <div>too many countries, please refine your filter</div>
  }
  else if (countries.length === 0)
  {
    return <div>no countries found with current filter</div>
  }
  else if (countries.length === 1)
  {
    return (<Country country={countries[0]} weatherData={weatherData}></Country>)
  }
  else 
  {
    return <div>
    <table>
    <tbody>
    
    {countries.map((e)=>{
      return (
        <tr key={e.name.common}><td>
        {e.name.common} <button onClick={()=>{forceCallback(e)}}>show</button>
      </td></tr>
      )
    })}
    </tbody>
    </table>

    {forceCountry != null ? <Country country={forceCountry} weatherData={weatherData}></Country> : ""}
    
    </div>
  }
}

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [forceCountry, setForceCountry] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    restcountries.getAll().then(res => {
      setCountries(res.data);
    });
  },[])

  const updateWeather = (lat, lon) => {
    restweather.getCountryWeather(lat, lon).then(res => {
      setWeatherData(res.data);
    });
  }

  useEffect(() => {
    const getCountries = (f) => {
      let arr = [];
      for(let i = 0; i < countries.length; i++)
      {
        if(countries[i].name.common.toLowerCase().includes(f.toLowerCase()))
        {
          arr.push(countries[i]);
        }
      }
      return arr;
    };

    setFilterCountries(getCountries(filter));
    setForceCountry(null);
    
  },[filter, countries])

  useEffect(() => {
    if(filterCountries.length === 1)
      updateWeather(filterCountries[0].latlng[0], filterCountries[0].latlng[1])
  },[filterCountries])

  const _setForceCountry = (country) => {
    setForceCountry(country);
    updateWeather(country.latlng[0], country.latlng[1]);
  }



  return (
    <div>
      <div>find countries: <input type="text" onChange={e => setFilter(e.target.value)}></input></div>
      <Countries countries={filterCountries} forceCountry={forceCountry} forceCallback={_setForceCountry} weatherData={weatherData}></Countries>
    </div>
  );
}

export default App;
