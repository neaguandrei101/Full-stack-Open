import React from 'react'

const Persons = ({persons, deleteFunc}) => {
    return (
        persons.map(person => 
                <p key={person.name}> 
                    {person.name} {person.number} 
                    <button onClick={() => deleteFunc(person)}>delete</button>
                </p>
        )
    )
}

export default Persons