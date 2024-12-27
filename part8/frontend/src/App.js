import {useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import {useQuery, useApolloClient, useSubscription} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED} from "./queries";

export const updateCache = (cache, query, addedBook) => {

    // helper that is used to eliminate saving same book twice
    const uniqByTitle = (a) => {
        let seen = new Set()
        const result = a.filter((item) => {
            let k = item.title
            return seen.has(k) ? false : seen.add(k)
        })

        return result;
    }

    cache.updateQuery({query: ALL_BOOKS, variables: {genre: null}}, (data) => {
        return {allBooks: uniqByTitle(data.allBooks.concat(addedBook)),}
    })

    addedBook.genres.forEach((genre) => {
        cache.updateQuery({query: ALL_BOOKS, variables: {genre: genre}}, (data) => {
            return {allBooks: uniqByTitle(data.allBooks.concat(addedBook)),}
        })
    })

}

const App = () => {
    const [page, setPage] = useState("authors");
    const result = useQuery(ALL_AUTHORS);
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({data}) => {
            const addedBook = data.data.bookAdded
            updateCache(client.cache, {query: ALL_BOOKS}, addedBook)
        }
    })

    if (result.loading) {
        return <div>loading...</div>;
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm setToken={setToken}/>
            </div>
        )
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("add")}>add book</button>
                <button onClick={() => setPage("recommend")}>recommend</button>
                <button onClick={logout}>logout</button>
            </div>

            <Authors show={page === "authors"} authors={result.data.allAuthors}/>

            <Books show={page === "books"}/>

            <NewBook show={page === "add"}/>

            <Recommend show={page === "recommend"}/>

        </div>
    );
};

export default App;
