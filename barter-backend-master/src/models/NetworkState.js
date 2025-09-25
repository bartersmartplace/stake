const { DataTypes } = require("sequelize");

module.exports = {
  define: (sequelize) => {
    return sequelize.define("network_states", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },
};
