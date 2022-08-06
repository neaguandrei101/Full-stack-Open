import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from "./components/Notification";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import anecdoteService from "./services/anecdoteService";
import {setAnecdotes} from "./reducers/anecdoteReducer";


const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService.getAll()
            .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <AnecdoteList/>

            <h2>create new</h2>
            <AnecdoteForm/>

        </div>
    )
}

export default App