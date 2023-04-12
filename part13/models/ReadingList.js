const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const ReadingList = sequelize.define(
  "readingList",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ReadingList;
