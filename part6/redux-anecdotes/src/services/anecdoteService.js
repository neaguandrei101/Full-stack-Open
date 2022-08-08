import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const generateId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const id = generateId()
    const object = {content, id, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const vote = async id => {
    const {data} = await axios.get(`${baseUrl}/${id}`)
    const newAnecdote = {...data, votes: data.votes + 1}
    const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
    return response.data
}

export default {
    getAll,
    createNew,
    vote
}