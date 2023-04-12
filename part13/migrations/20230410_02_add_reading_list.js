const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("reading_list", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("reading_list");
  },
};
