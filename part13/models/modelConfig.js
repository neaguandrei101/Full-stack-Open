const Blog = require("./Blog");
const User = require("./User");
const ReadingList = require("./ReadingList");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "blogsToRead" });
Blog.belongsToMany(User, { through: ReadingList, as: "inUserReadingList" });

module.exports = {
  Blog,
  User,
  ReadingList,
};
