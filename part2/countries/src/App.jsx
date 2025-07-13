import { useState, useEffect } from "react"
import countriesService from "./services/countries"
import weatherService from "./services/weather"

const Filter = ({value, onChange}) => {
  return(
    <form>
      <div>
        Find countries <input 
          value = {value}
          onChange = {onChange}
          />
      </div>
    </form>
  )
}

const LanguageList = ({languages}) => {
  return (
    <ul>
      {Object.entries(languages).map(([code, name]) => (
        <li key = {code}>
          {name}
        </li>
      ))}
    </ul>
  )
}

const DisplayWeather = ({data}) => {
  if (data) {
    return (
      <div>
        <p>Temperature {data.main.temp} Celsius</p>
        <img src = {" https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"}/>
        <p>Temperature {data.wind.speed} m/s</p>
      </div>
    )
  }
}

const DisplayCountry = ({country}) => {
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <LanguageList languages = {country.languages} />
      <img src={country.flags.png} alt='Flag' height={200}/>
      <h3>Weather in {country.capital}</h3>
    </div>
  )
}

const DisplayCountries = ({countries, handleShow, handleWeather}) => {
  if (countries.length >= 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if (countries.length === 1) {
    return(
      <div>
        <DisplayCountry country={countries[0]} handleWeather={handleWeather} />
      </div>
    )
  }
  return(
    <div>
      {countries.map(country => 
        <div key = {country.name.common}>
          {country.name.common}
          <button onClick={() => handleShow(country.name.common)}>Show</button>
         </div>
      )}
    </div> 
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [fetchedCountryData, setFetchedCountryData] = useState(null);
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
        .then(initialCountries => {
          setCountries(initialCountries)
        })
    }, [])

  useEffect(() => {
    if (selectedCountry) {
      countriesService
        .getDistinct(selectedCountry)
          .then(fetchedCountry => {
            setFetchedCountryData(fetchedCountry)
    })
    }
  }, [selectedCountry])

  useEffect(() => {
    let weatherCountry = null;
    if (selectedCountry) {
      weatherCountry = countries.find(
        (c) => c.name.common === selectedCountry)
    } else {
      const filtered = countries.filter((el) => 
        el.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      if (filtered.length === 1) {
        weatherCountry = filtered[0]
      }
    }
    if (weatherCountry) {
      const [lat, lng] = weatherCountry.latlng;
      weatherService.getWeather(lat,lng).then((weatherData) => {
        setWeather(weatherData)
      })
    }
  }, [newFilter, selectedCountry, countries])

  const countriesToShow = fetchedCountryData
    ? [fetchedCountryData]
    : countries.filter((el) => 
        el.name.common.toLowerCase().includes(newFilter.toLowerCase())
      )

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setSelectedCountry(null)
    setFetchedCountryData(null)
    setWeather(null)
  }

  const handleShow = (nameToShow) => {
    setSelectedCountry(nameToShow)
  }

  

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <DisplayCountries countries={countriesToShow} handleShow={handleShow} />
      <DisplayWeather data = {weather} />
    </div>
  )
}

export default App