const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Query {
    #bookCount: Int
    #authorCount: Int
    #allBooks(author: String, genre: Genre): [Book!]!
    allAuthors: [Author]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ):Book
    #editAuthor(
    #  name:String!
    #  born:Int!
    #):Author
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
    // bookCount: () => books.length,
    // authorCount: () => [...new Set(books.map((book) => book.author))].length,
    // allBooks: (root, args) => {
    //   let result = [];
    //
    //   if (!args.author && !args.genre) result = books;
    //   else if (args.author && args.genre)
    //     result = books
    //       .filter((book) => book.author === args.author)
    //       .filter((book) => book.genres.includes(args.genre.toLowerCase()));
    //   else if (args.author && !args.genre)
    //     result = books.filter((book) => book.author === args.author);
    //   else if (args.genre && !args.author)
    //     result = books.filter((book) =>
    //       book.genres.includes(args.genre.toLowerCase())
    //     );
    //
    //   return result;
    // },
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: (root) => 99,
    // books.filter((book) => book.author === root.name).length,
  },

  Book: {
    author: (root) => 'hardcoded',
  },

  Mutation: {
    addBook: async (root, args) => {
      const { title, published, author, genres } = args;

      let savedAuthor = await Author.findOne({name: author})

      if (!savedAuthor) {
        const newAuthor =  new Author({ name: author });
        savedAuthor = await newAuthor.save()
      }

      const createdBook = new Book({ ...args, author: savedAuthor });
      const savedBook = createdBook.save()

      return savedBook;
    },

    // editAuthor: (root, args) => {
    //   const { name, born } = args;
    //   let result = null;
    //
    //   const authorIndex = authors.findIndex((val) => val.name === name);
    //
    //   if (authorIndex >= 0) {
    //     authors[authorIndex].born = born;
    //     result = authors[authorIndex];
    //   }
    //
    //   return result;
    // },
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
