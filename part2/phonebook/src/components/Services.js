import axios from 'axios'

const backendGet = () => {
    return axios
        .get('http://localhost:3001/persons')
}

const backendPost = (personObject) => {
    return axios
        .post('http://localhost:3001/persons', personObject)
}

const backendDelete = (id) => {
       axios.delete(`http://localhost:3001/persons/${id}`)
}

export { backendGet, backendPost , backendDelete}


