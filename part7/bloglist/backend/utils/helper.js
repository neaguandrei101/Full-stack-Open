const User = require("../models/user");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);

  const reducer = (sum, item) => {
    return sum + item;
  };

  return likes.reduce(reducer, 0);
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  usersInDb,
};
