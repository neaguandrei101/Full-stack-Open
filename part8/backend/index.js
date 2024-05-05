const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

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
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
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
    allBooks: async (root, args) => {
      let result = [];

      if (!args.author && !args.genre) result = await Book.find({});
      else if (args.author && args.genre) {
        const queryResult = await Book.find({
          genres: {
            $elemMatch: {
              $eq: args.genre
            }
          }
        })
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
        const queryResult = await Book.find({
          genres: {
            $elemMatch: {
              $eq: args.genre
            }
          }
        })
          .populate('author')

        result = queryResult.filter(book => book.author !== null)
      }

      return result;
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
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
    addBook: async (root, args, context) => {
      const { title, published, author, genres } = args;

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let savedAuthor = await Author.findOne({ name: author })

      if (!savedAuthor) {
        savedAuthor = await Author.create({ name: author });
      }

      const newBook = new Book({ ...args, author: savedAuthor });

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        });
      }

      return newBook;
    },

    editAuthor: async (root, args, context) => {
      const { name, born } = args;

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      let author = await Author.findOne({ name: name })
      author.born = born;

      return await author.save();
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
