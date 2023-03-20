const Blog = require("./Blog");
const User = require("./User");

User.hasMany(Blog);
Blog.belongsTo(User);

void Blog.sync({ alter: true });
void User.sync({ alter: true });

module.exports = {
  Blog,
  User,
};