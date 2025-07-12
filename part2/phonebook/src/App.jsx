import { useState } from 'react'

const Display = ({persons}) => {
  return(
    <table>
      <tbody>
          {persons.map(person =>
            <tr key = {person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          )}
      </tbody>
    </table>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
      <form>
        <div>
          filter shown with <input 
            value = {newFilter}
            onChange = {handleFilterChange}
            />
        </div>
      </form>
      <h2>Add new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value = {newName}
            onChange = {handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value = {newNumber}
            onChange = {handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Display persons={personsToShow} />
    </div>
  )

}

export default App