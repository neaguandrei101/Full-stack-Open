const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const ReadingList = sequelize.define(
  "readingList",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      references: { model: "blogs", key: "id" },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "reading_list",
    underscored: true,
  }
);

module.exports = ReadingList;
