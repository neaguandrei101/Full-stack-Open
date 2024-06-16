import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
    const me = useQuery(ME);
    const query = useQuery(ALL_BOOKS);
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (query.data && me.data) {
            const filteredBooks = query.data.allBooks.filter((book) => book.genres.includes(me.data.me.favoriteGenre));
            setBooks(filteredBooks)
        }
    },[query, me])

    if (!props.show) {
        return null;
    }

    if (query.loading || me.loading)
        return <div>loading...</div>

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommend;
