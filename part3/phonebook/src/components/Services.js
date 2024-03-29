import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://pacific-springs-87048.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const backendGet = () => {
    return axios
        .get(baseUrl)
}

const backendPost = (personObject) => {
    return axios
        .post(baseUrl, personObject)
}

const backendDelete = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
}

const backendPut = (id, personObject) => {
    return axios
        .put(`${baseUrl}/${id}`, personObject)
}

export { backendGet, backendPost, backendDelete ,backendPut}


