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
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
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

    allBooks: async (root, args) => {
      let result = [];

      if (!args.author && !args.genre) result = await Book.find({});
      else if (args.author && args.genre) {
        const queryResult = await Book.find({genres: { 
          $elemMatch: { 
              $eq: args.genre
          }
      }})
          .populate({
            path: 'author',
            match: { name: { $eq: args.author }, }
          })

        result = queryResult.filter(book => book.author !== null)
      } else if (args.author && !args.genre) {
        const queryResult = await Book.find({})
          .populate({
            path: 'author',
            match: { name: { $eq: args.author }, }
          })

        result = queryResult.filter(book => book.author !== null)
      } else if (args.genre && !args.author) {
        const queryResult = await Book.find({genres: { 
          $elemMatch: { 
              $eq: args.genre
          }
      }})
          .populate('author')

        result = queryResult.filter(book => book.author !== null)
      }

      return result;
    },
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      const noOfBooks = await Book.find({}).populate({
        path: 'author',
        match: { name: { $eq: root.name } }
      }).count()
      return noOfBooks;
    },
  },

  Book: {
    author: async (root) => {
      const author = await Author.findOne({ _id: root.author._id }).lean();
      return author.name;
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      const { title, published, author, genres } = args;

      let savedAuthor = await Author.findOne({ name: author })

      if (!savedAuthor) {
        savedAuthor = await Author.create({ name: author });
      }

      const savedBook = await Book.create({ ...args, author: savedAuthor });

      return savedBook;
    },

    editAuthor: async (root, args) => {
      const { name, born } = args;

      let author = await Author.findOne({ name: name })
      author.born = born;

      return await author.save();
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
