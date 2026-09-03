import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [searchString, setsearchString] = useState('')
  const [data, updateData] = useState([])
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_KEY
 

  const hook = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        updateData(response.data)
        console.log('fetched the data')
      })
  }

  useEffect(hook, [])

  const countriesToShow = searchString
    ? data.filter(country => {
        return country.name.common.toLowerCase().includes(searchString.toLowerCase())
      })
    : []

  const exactMatch = countriesToShow.find(
    country => country.name.common.toLowerCase() === searchString.trim().toLowerCase()
  )
  
 const matchingCountries = exactMatch ? [exactMatch] : countriesToShow


 const capital = matchingCountries.length === 1 ? matchingCountries[0].capital?.[0] : null

  useEffect(() => {
    if (capital && apiKey) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(err => console.error('Weather fetch error:', err))
    }
  }, [capital, apiKey])
  const display = () => {
    // If the input is empty, return nothing
    if (!searchString) return null

    const fresh = countriesToShow.map(country => (
      <p key={country.cca3 || country.name.common}>
        {country.name.common}
        <button onClick={() => setsearchString(country.name.common)}>show</button>
      </p>
    ))

    if (fresh.length > 10) {
      return (
        <p>Too many matches,specify another filter</p>
      )
    } 
    // ERROR 1 FIX: matchingCountries is an array (even if 1 item). 
    // exactMatch was an object, and calling .map() on an object crashed the app.
    // We map matchingCountries here:
    else if (matchingCountries.length === 1) {
      const country = matchingCountries[0]
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital?.[0]}</p>
          <p>area {country.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(country.languages || {}).map(lang => (
              <li key={lang}>{lang} </li>
            ))}
          </ul>
          <img 
            src={country.flags.png} 
            alt={country.flags.alt || `Flag of ${country.name.common}`} 
            width="150" 
          />
          {weather && (
            <div>
              <h2>Weather in {country.capital?.[0]}</h2>
              <p>temperature {weather.main.temp} Celsius</p>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} 
              />
              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )}
        </div>
      )
    }
    // ERROR 2 FIX: When matches are between 2 and 10, your code returned undefined.
    // We return the list of matching names ('fresh') here:
    else {
      return fresh
    }
  }

  const handleSearchChange = (event) => {
    setsearchString(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={searchString} onChange={handleSearchChange} />
      </div>
      <div>
        {/* ERROR 3 FIX: display is a function. 
            Writing {display} just renders nothing. 
            You must call it with parentheses: {display()} */}
        {display()}
      </div>
    </div>
  )
}

export default App