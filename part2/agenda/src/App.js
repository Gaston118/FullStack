import React, { useState , useEffect} from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName) || persons.some(persons => persons.number === newNumber)) {
      alert(`${newName} o ${newNumber} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
    axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
}
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleSearchChange = (event) => {
  setNewFilter(event.target.value);
}

const filteredPersons = persons.filter(person =>
  person.name && person.name.toLowerCase().startsWith(newFilter.toLowerCase())
);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <Filter searchTerm={newFilter} onSearchChange={handleSearchChange} />
      </div>
      <h2>Add a new</h2>
      <PersonForm
      addName={addName}
      newName={newName}
      handleName={handlePersonChange}
      newNumber={newNumber}
      handleNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
       {filteredPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
      </ul>
    </div>
  )
}

export default App