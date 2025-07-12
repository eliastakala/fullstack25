import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Display from './components/Display'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if (found) {
      if (window.confirm("Update?")) {
        const personObject = {
          name: found.name,
          number: newNumber,
          id: found.id
        }   
        personService
          .update(found.id, personObject)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== found.id ? person: updatedPerson))
              setNewName('')
              setNewNumber('')
            })
      } else {
        setNewName('')
        setNewNumber('')
        return;
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }   
    personService
      .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })
  }

  const handleDelete = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
      personService
        .remove(id)
          .then(response =>
            setPersons(persons.filter(person => person.id !== id))
          );
    } else {
      return
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  const personsToShow = persons.filter((el) => 
  el.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      value = {newFilter}
      onChange = {handleFilterChange}
      />
      <h3>Add new person</h3>
      <Add 
      nameValue = {newName}
      nameChange = {handleNameChange}
      numberValue = {newNumber}
      numberChange = {handleNumberChange}
      action = {addPerson}
      />
      <h3>Numbers</h3>
      <Display
      persons={personsToShow}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default App