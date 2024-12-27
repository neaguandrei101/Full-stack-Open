import {useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import {useQuery, useApolloClient, useSubscription} from "@apollo/client";
import {ALL_AUTHORS, BOOK_ADDED} from "./queries";

const App = () => {
    const [page, setPage] = useState("authors");
    const result = useQuery(ALL_AUTHORS);
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({data}) => {
            console.log(data)
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
