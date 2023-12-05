import React, { useState } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.content === newName) || persons.some(persons => persons.number === newNumber)) {
      alert(`${newName} o ${newNumber} is already added to phonebook`);
      setNewName('')
      setNewNumber('')
    } else {
      const nameObject = {
        content: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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
  person.content.toLowerCase().startsWith(newFilter.toLowerCase())
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