import React, { useState , useEffect} from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      const id = persons.find(person => person.name === newName).id
      const nameObject = {
        name: newName,
        number: newNumber
      }
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
        .update(id, nameObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`);
        })
        .catch(error => {
          showNotification(`the person '${newName}' was already deleted from server`);
          console.log(error)
          setPersons(persons.filter(n => n.id !== id))
        })
      }

    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      personsService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newName}`);
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

const handleDelete = (id) => {
  const person = persons.find(person => person.id === id)
  if (person && window.confirm(`Delete ${person.name} ?`)) {
    personsService
    .borrar(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
      showNotification(`Deleted ${person.name}`);
    })
    .catch(error => {
      console.error('Error deleting person:', error);
    });
  }
}

const showNotification = message => {
  setNotification(message);
  setTimeout(() => {
    setNotification(null);
  }, 5000); // La notificación desaparecerá después de 5 segundos
};

const filteredPersons = persons.filter(person =>
  person.name && person.name.toLowerCase().startsWith(newFilter.toLowerCase())
);

  return (
    <div>
      {notification && <div className="notification">{notification}</div>}
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
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      ))}
      </ul>
    </div>
  )
}

export default App