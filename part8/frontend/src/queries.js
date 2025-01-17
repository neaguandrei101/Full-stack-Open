import { gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author
      id
      genres
    }
  }
`;

const ALL_BOOKS = gql`
query AllBooks($genre: Genre) {
  allBooks(genre: $genre) {
    title
    published
    author
    id
    genres
  }
}
`;

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      bookCount
      born
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

const ME = gql`
query Me {
  me {
    username
    favoriteGenre
    id
  }
}`

const BOOK_ADDED = gql`
  subscription Subscription {
    bookAdded {
      title
      published
      author
      id
      genres
    }
  }
`

export { ALL_AUTHORS, ADD_BOOK, ALL_BOOKS, EDIT_AUTHOR, LOGIN, ME, BOOK_ADDED };
