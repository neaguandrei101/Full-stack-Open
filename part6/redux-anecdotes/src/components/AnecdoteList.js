import {useDispatch, useSelector} from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'

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

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    vote={() => dispatch(vote(anecdote.id))}
                />
            )}
        </ul>
    )
}

export default AnecdoteList