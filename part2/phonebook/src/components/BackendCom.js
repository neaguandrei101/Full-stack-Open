import axios from 'axios'

const backendGet = (setPersons, setPersonsToShow) => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
}

const backendPost = (personObject) => {
    axios.post('http://localhost:3001/persons', personObject)
}

export {backendGet, backendPost}


