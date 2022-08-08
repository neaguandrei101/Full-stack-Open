import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {createNotification, removeNotification} from '../reducers/notificationReducer'

const Anecdote = ({anecdote, vote}) => (
    <li>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={vote}>vote</button>
        </div>
    </li>
)

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes))

    const handleVote = (anecdote) => {
        dispatch(createNotification(anecdote.content))
        dispatch(voteAnecdote(anecdote.id))

        setTimeout(() => {
            dispatch(removeNotification())
        }, "5000")
    }

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    vote={() => handleVote(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList