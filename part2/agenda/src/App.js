import React, { useState } from 'react'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.content === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        content: newName,
        id: persons.length + 1,
      }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }
}

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
       {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
      </ul>
    </div>
  )
}

export default App