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
  
  type Subscription {
    bookAdded: Book!
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

module.exports = typeDefs