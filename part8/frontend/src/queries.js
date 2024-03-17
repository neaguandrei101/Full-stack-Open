import { gql } from "@apollo/client";

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      bookCount
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
  query AllBooks {
    allBooks {
      title
      published
      author
      id
    }
  }
`;

export { ALL_AUTHORS, ADD_BOOK, ALL_BOOKS };
