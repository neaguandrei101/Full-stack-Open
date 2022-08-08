import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdoteService";

export const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote: (state, action) => {
            return state.map(anecdote =>
                anecdote.id !== action.payload
                    ? anecdote
                    : {...anecdote, votes: anecdote.votes + 1}
            )
        },
        appendAnecdote: (state, action) => {
            state.push(action.payload)
        },
        setAnecdotes: (state, action) => {
            return action.payload
        }
    }
})

const {vote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const notes = await anecdoteService.getAll()
        dispatch(setAnecdotes(notes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = id => {
    return async dispatch => {
        await anecdoteService.vote(id)
        dispatch(vote(id))
    }
}

export default anecdoteSlice.reducer