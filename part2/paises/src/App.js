import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'

function App() {
  const [ paises, setPaises ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setPaises(response.data)
      })

      if (selectedCountry || (paises.length === 1 && !selectedCountry)) {
        // Obtén la latitud y longitud para la solicitud de OpenWeatherMap
        const latitude = selectedCountry ? selectedCountry.latlng[0] : paises[0].latlng[0];
        const longitude = selectedCountry ? selectedCountry.latlng[1] : paises[0].latlng[1];
  
        // Construye la URL para la solicitud de OpenWeatherMap
        const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(2)}&lon=${longitude.toFixed(2)}&appid=${api_key}`;
  
        // Realiza la solicitud a OpenWeatherMap
        axios.get(openWeatherMapUrl)
          .then(response => {
            const weatherData = response.data;
            setWeather(weatherData);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      }
  
  }, [selectedCountry, paises, api_key])

  const handleSearchChange = (event) => {
    setNewFilter(event.target.value);
    setSelectedCountry(null);
  }

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };
  
  const filteredCountries =
    newFilter.trim() !== ''
      ? paises.filter(
          (pais) =>
            pais.name.common &&
            pais.name.common.toLowerCase().startsWith(newFilter.toLowerCase())
        )
      : [];

  const mensaje =
    filteredCountries.length > 10
      ? 'To many matches, specify another filter'
      : '';
  
  const detalles = filteredCountries.length === 1
  const countryDetails = detalles ? filteredCountries[0] : null;
  
  return (
    <div>
      <Filter searchTerm={newFilter} onSearchChange={handleSearchChange} />
      {mensaje || (
        <ul>
          {filteredCountries.map((pais) => (
            <li key={pais.name.common}>{pais.name.common}
            {filteredCountries.length > 1 && (
              <button onClick={() => handleCountryClick(pais)}>
                show
              </button>
            )}
            </li>
          ))}
        </ul>
      )}
      {selectedCountry && (
        <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Poblacion: {selectedCountry.population}</p>
        <p>
            Idiomas:{' '}
            <ul>
              {selectedCountry.languages &&
               Object.values(selectedCountry.languages).map((idioma, index) => (
                 <li key={index}>{idioma}</li>
                ))}
           </ul>
          </p>
        <img src={selectedCountry.flags.png} alt={`Bandera de ${selectedCountry.name.common}`}/>
        <h3>Weather in {selectedCountry.name.common}</h3>
        {weather && weather.main && (
        <div>
        <p>Temp: {(weather.main.temp - 273).toFixed(2) + '°C'}</p>
        <p>Temp Min: {(weather.main.temp_min - 273).toFixed(2) + '°C'}</p>
        <p>Temp Max: {(weather.main.temp_max - 273).toFixed(2) + '°C'}</p>
        <p>Humedad: {weather.main.humidity + "%"}</p>
        <p>Wind speed: {weather.wind.speed + "Km/h"}</p>
        </div>
        )}
      </div>
      )
      }
      {detalles && countryDetails &&(
          <div>
          <h2>{countryDetails.name.common}</h2>
          <p>Capital: {countryDetails.capital}</p>
          <p>Poblacion: {countryDetails.population}</p>
          <p>
            Idiomas:{' '}
            <ul>
              {countryDetails.languages &&
               Object.values(countryDetails.languages).map((idioma, index) => (
                 <li key={index}>{idioma}</li>
               ))}
            </ul>
          </p>
          <img src={countryDetails.flags.png} alt={`Bandera de ${countryDetails.name.common}`}/>
          <h3>Weather in {countryDetails.name.common}</h3>
          {weather && weather.main && (
        <div>
        <p>Temp: {(weather.main.temp - 273).toFixed(2) + '°C'}</p>
        <p>Temp Min: {(weather.main.temp_min - 273).toFixed(2) + '°C'}</p>
        <p>Temp Max: {(weather.main.temp_max - 273).toFixed(2) + '°C'}</p>
        <p>Humedad: {weather.main.humidity + "%"}</p>
        <p>Wind speed: {weather.wind.speed + "Km/h"}</p>
        </div>
        )}
          </div>
      )}
    </div>
  );
}

export default App;
