const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Session = sequelize.define("sessions", {
  sessionId: {
    type: DataTypes.STRING(16),
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
  },
});

module.exports = Session;
