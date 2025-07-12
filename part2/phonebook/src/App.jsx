import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Add from './components/Add'
import Display from './components/Display'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber
    }   
    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
    })
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
      />
    </div>
  )

}

export default App