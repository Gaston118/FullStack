import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Filter from './Filter'

function App() {
  const [ paises, setPaises ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setPaises(response.data)
      })
  }, [])
  console.log('render', paises.length, 'paises')
  console.log(paises)

  const handleSearchChange = (event) => {
    setNewFilter(event.target.value);
  }
  
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
            <li key={pais.name.common}>{pais.name.common}</li>
          ))}
        </ul>
      )}
      {detalles && countryDetails &&(
          <div>
          <h2>{countryDetails.name.common}</h2>
          <p>Capital: {countryDetails.capital}</p>
          <p>Poblacion: {countryDetails.population}</p>
          <p>Idiomas: {Object.values(countryDetails.languages).join(', ')}</p>
          <img src={countryDetails.flags.png} alt={`Bandera de ${countryDetails.name.common}`}/>
        </div>
      )}
    </div>
  );
}

export default App;
