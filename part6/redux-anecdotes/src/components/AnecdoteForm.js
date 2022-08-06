import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {createNotification, removeNotification} from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(createNotification(content))

        setTimeout(() => {
            dispatch(removeNotification())
        }, "5000")
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name={'anecdote'}/>
            <button type={'submit'}>create</button>
        </form>
    )
}

export default AnecdoteForm