const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: Genre): [Book!]!
    allAuthors: [Author]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book
    editAuthor(
      name:String!
      born:Int!
    ):Author
  }
  
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }
  
  enum Genre {
    REFACTORING
    AGILE
    PATTERNS 
    DESIGN
    CLASSIC 
    REVOLUTION
    CRIME
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => [...new Set(books.map((book) => book.author))].length,
    allBooks: (root, args) => {
      let result = [];

      if (!args.author && !args.genre) result = books;
      else if (args.author && args.genre)
        result = books
          .filter((book) => book.author === args.author)
          .filter((book) => book.genres.includes(args.genre.toLowerCase()));
      else if (args.author && !args.genre)
        result = books.filter((book) => book.author === args.author);
      else if (args.genre && !args.author)
        result = books.filter((book) =>
          book.genres.includes(args.genre.toLowerCase())
        );

      return result;
    },
    allAuthors: () => authors,
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },

  Mutation: {
    addBook: (root, args) => {
      const { title, published, author, genres } = args;

      const createdBook = { ...args, id: uuid() };
      books.push(createdBook);

      const found = authors.find((val) => val.name === author);

      let createdAuthor = null;
      if (!found) {
        createdAuthor = { author, id: uuid() };
        authors.push(createdAuthor);
      }

      return createdBook;
    },

    editAuthor: (root, args) => {
      const { name, born } = args;
      let result = null;

      const authorIndex = authors.findIndex((val) => val.name === name);

      if (authorIndex >= 0) {
        authors[authorIndex].born = born;
        result = authors[authorIndex];
      }

      return result;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
