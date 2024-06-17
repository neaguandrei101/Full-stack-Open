import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const query = useQuery(ALL_BOOKS, {    
    variables: { genre } 
  });
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (!query.loading)
      setBooks(query.data.allBooks)},
    [query])

  if (!props.show) {
    return null;
  }

  if (query.loading)
    return <div>loading...</div>

  const filter = (e) => {
    if (e.target.innerText === "ALL") {
      setGenre(null)
    } else {
      setGenre(e.target.innerText)
    }
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
