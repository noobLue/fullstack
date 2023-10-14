import { useState, useEffect, TextInput } from 'react'
import restcountries from './services/restcountries'

const Country = ({country}) => {
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

      <img src={country.flags.png}></img>

    </div>
  )
}

const Countries = ({countries, forceCountry, forceCallback}) => {
  console.log(countries);

  if(countries.length > 10)
  {
    return <div>too many countries, please refine your filter</div>
  }
  else if (countries.length == 0)
  {
    return <div>no countries found with current filter</div>
  }
  else if (countries.length == 1)
  {
    return (<Country country={countries[0]}></Country>)
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

    {forceCountry != null ? <Country country={forceCountry}></Country> : ""}
    
    </div>
  }
}

function App() {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState([]);
  const [forceCountry, setForceCountry] = useState(null);

  useEffect(() => {
    restcountries.getAll().then(res => {
      console.log(res.data);
      setCountries(res.data);
    });
  },[])

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

  useEffect(() => {
    setFilterCountries(getCountries(filter));
    setForceCountry(null);
  },[filter])

  const _setForceCountry = (country) => {
    setForceCountry(country);
    console.log(country);
  }

  return (
    <div>
      <div>find countries: <input type="text" onChange={e => setFilter(e.target.value)}></input></div>
      <Countries countries={filterCountries} forceCountry={forceCountry} forceCallback={_setForceCountry}></Countries>
    </div>
  );
}

export default App;
