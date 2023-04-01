const { sequelize } = require("../util/db");
const { DataTypes } = require("sequelize");

const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1991,
          msg: "The year must be at least 1991",
        },
        max: {
          args: new Date().getFullYear(),
          msg: `The year must be less than ${new Date().getFullYear()}`,
        },
      },
    },
  },
  {
    underscored: true,
  }
);

module.exports = Blog;
