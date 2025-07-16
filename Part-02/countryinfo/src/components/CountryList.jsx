const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  )
}

export default CountryList
