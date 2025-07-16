const CountryList = ({ countries, handleShowClick }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleShowClick(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList
