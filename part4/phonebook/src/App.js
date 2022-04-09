import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import { backendGet, backendPost, backendDelete, backendPut } from './components/Services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [change, setChange] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    backendGet().then(response => {
      setPersons(response.data)
    }).catch(error => console.log(error))
  }, [change])

  useEffect(() => {
    setPersonsToShow(persons.filter(person => {
      const foo = person.name.toLowerCase().includes(filter.toLowerCase())
      return foo
    }))
  }, [filter, persons])

  const Notification = ({ message }) => {
    const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    if (message === null) {
      return null
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  const notificationMsgTimeout = (name) => {
    setNotification(`${name} added`)
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleAdd = (event) => {
    setChange(!change)
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      const confirmMsg = `${newName} is already added to phonebook, replace old number with a new one?`
      const result = window.confirm(confirmMsg)
      if (result) {
        const person = persons.find(person => person.name === newName)
        const personWnewNumber = { ...person, number: newNumber }
        backendPut(personWnewNumber.id, personWnewNumber)
          .then(response => {
            setPersons(persons.map(person => person.id !== personWnewNumber.id ? person : response.data))
            notificationMsgTimeout(response.data.name)
          })
      }
      setNewNumber('')
      setNewName('')
    } else {
      const personObject = { name: newName, number: newNumber }
      backendPost(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          notificationMsgTimeout(response.data.name)
        })
        .catch(exception => console.log(exception))
      setNewNumber('')
      setNewName('')
    }

    return (notification)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      backendDelete(person.id)
      setChange(!change)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    setChange(!change)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    setChange(!change)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setChange(!change)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter}
        handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addName={handleAdd}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteFunc={handleDelete} />
    </div>
  )
}

export default App