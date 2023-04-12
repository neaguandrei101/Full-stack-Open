const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: "reading_list" });
Blog.belongsToMany(User, { through: "reading_list" });

module.exports = {
  Blog,
  User,
};
