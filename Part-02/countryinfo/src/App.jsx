import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (search === '') {
      setCountries([])
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filtered = response.data.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
        setCountries(filtered)
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [search])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <h1>Country Finder</h1>
      <div>
        Find countries: <input value={search} onChange={handleSearchChange} />
      </div>

      {countries.length > 10 && <p>Too many matches, specify another filter.</p>}

      {countries.length <= 10 && countries.length > 1 && (
        <CountryList countries={countries} />
      )}

      {countries.length === 1 && (
        <CountryInfo country={countries[0]} />
      )}
    </div>
  )
}

export default App
