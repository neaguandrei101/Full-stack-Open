import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const query = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([])

  useEffect(() => setBooks(query.data.allBooks),
    [query.data])

  if (!props.show) {
    return null;
  }

  if (query.loading)
    return <div>loading...</div>

  const filter = (e) => {

    const allBooks = query.data.allBooks;

    let result = []
    if (e.target.innerText === "ALL") {
      result = allBooks
    } else {
      result = allBooks.filter((book) => book.genres.includes(e.target.innerText));
    }
    setBooks(result)
  }

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
      <button onClick={filter}>REFACTORING</button>
      <button onClick={filter}>AGILE</button>
      <button onClick={filter}>PATTERNS</button>
      <button onClick={filter}>DESIGN</button>
      <button onClick={filter}>CLASSIC</button>
      <button onClick={filter}>REVOLUTION</button>
      <button onClick={filter}>CRIME</button>
      <button onClick={filter}>ALL</button>
    </div>
  );
};

export default Books;
