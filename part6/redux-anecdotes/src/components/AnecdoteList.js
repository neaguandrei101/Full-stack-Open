import {connect} from 'react-redux'
import {createAnecdote, voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {

    const handleVote = (anecdote) => {
        props.setNotification(`you voted '${anecdote.content}'`, 10)
        props.voteAnecdote(anecdote.id)
    }

    return (
        <ul>
            {props.anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    vote={() => handleVote(anecdote)}
                />
            )}
        </ul>
    )
}

const mapStateToProps = (state) => ({
    anecdotes: [...state.anecdotes].sort((a, b) => b.votes - a.votes)
})

const mapDispatchToProps = {
    createAnecdote,
    setNotification,
    voteAnecdote
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)