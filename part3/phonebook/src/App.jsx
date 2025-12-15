import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Display from './components/Display'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
            .catch(error => {
              setErrorMessage(
                `${found.name} already deleted`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              personService.getAll().then(allPersons => setPersons(allPersons))
            })
            setNewName('')
            setNewNumber('')
            return
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
          setSuccessMessage(
          `${createdPerson.name} was added successfully`
        )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          // this is the way to access the error message
          console.log(error.response.data.error)
        })
  }

  const handleDelete = (id, name) => {
    if (window.confirm("Delete " + name + "?")) {
      personService
        .remove(id)
          .then(response =>
            setPersons(persons.filter(person => person.id !== id))
          )
          .catch(error => {
              setErrorMessage(
                `${name} already deleted`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              personService.getAll().then(allPersons => setPersons(allPersons))
            })
            setNewName('')
            setNewNumber('')
            return
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
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
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