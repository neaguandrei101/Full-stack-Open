import {createSlice} from '@reduxjs/toolkit'

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
        createAnecdote: (state, action) => {
            const anecdote = action.payload
            state.push(anecdote)
        },
        appendAnecdote: (state, action) => {
            state.push(action.payload)
        },
        setAnecdotes: (state, action) => {
            return action.payload
        }
    }
})

export const {createAnecdote, vote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer