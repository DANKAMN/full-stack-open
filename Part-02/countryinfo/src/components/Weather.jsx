import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then(response => setWeather(response.data))
      .catch(error => console.error('Weather error:', error))
  }, [city])

  if (!weather) return <p>Loading weather...</p>

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
