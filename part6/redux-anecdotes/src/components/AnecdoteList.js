import {useDispatch, useSelector} from 'react-redux'
import {voteAction} from '../reducers/anecdoteReducer'

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
    const anecdotes = useSelector(state => state.sort((a, b) => a.votes < b.votes))
    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    vote={() => dispatch(voteAction(anecdote.id))}
                />
            )}
        </ul>
    )
}

export default AnecdoteList