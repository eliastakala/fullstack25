import { useState, useEffect } from "react"
import axios from 'axios'

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

const DisplayCountry = ({country}) => {
  console.log('country', country)
  console.log('lan', country.languages)
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <LanguageList languages = {country.languages} />
      <img src={country.flags.png} alt='Flag' width={200} height={200}/>
    </div>
  )
}

const DisplayCountries = ({countries}) => {
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
        <DisplayCountry country={countries[0]} />
      </div>
    )
  }
  return(
    <div>
      {countries.map(country => 
        <div key = {country.name.common}> {country.name.common} </div>
      )}
    </div> 
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const countryData = response.data.map((country) => country);
        setCountries(countryData)
      })
    }, [])
  
  const countriesToShow = countries.filter((el) => 
  el.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <DisplayCountries countries={countriesToShow} />
    </div>
  )
}

export default App