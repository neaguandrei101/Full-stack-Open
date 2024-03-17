import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("author not found");
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("update author year...");
    const selectedAuthor = Object.fromEntries(
      new FormData(event.target).entries()
    ).selectedAuthor;

    await editAuthor({
      variables: { name: selectedAuthor, born: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });

    setName("");
    setBorn("");
  };

  const authors = props.authors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <label>
          Author:
          <select name={"selectedAuthor"}>
            {authors.map((author) => (
              <option key={author.name}>{author.name}</option>
            ))}
          </select>
        </label>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
