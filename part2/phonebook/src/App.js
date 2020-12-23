import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { backendGet, backendPost, backendDelete } from './components/Services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [filterEnabled, setFilterEnabled] = useState(true)

  useEffect(() => {
    backendGet().then(response => {
      setPersons(response.data)
      setPersonsToShow(response.data)
    })

    const interval = setInterval(() => {
      backendGet().then(response => {
        setPersons(response.data)
      })
    }, 1000)
    return () => clearInterval(interval)
  }
    , [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      setNewNumber('')
      setNewName('')
    } else {
      const personObject = { name: newName, number: newNumber }
      backendPost(personObject).then(response => {
        setPersons(persons.concat(response.data))
      })
      setNewNumber('')
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterButtonClick = (event) => {
    setFilterEnabled(!filterEnabled)
    if (filterEnabled) {
      const list = persons.filter(person => {
        const myFilter = person.name.toLowerCase().includes(filter.toLowerCase())
        return myFilter
      })
      setPersonsToShow(list)
    } else {
      setPersonsToShow(persons)
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} 
      handleFilterChange={handleFilterChange} 
      handleFilterButtonClick ={handleFilterButtonClick}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteFunc={backendDelete} />
    </div>
  )
}

export default App