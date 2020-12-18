import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    //console.log(`persons.include()= ${persons.includes({name: newName})}`)
    if(persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`);
      setNewName('')  
    } else {
      setPersons(persons.concat({name: newName}))
      setNewName('')  }
    }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =><p key={person.name}> {person.name} </p>)}
    </div>
  )
}

export default App