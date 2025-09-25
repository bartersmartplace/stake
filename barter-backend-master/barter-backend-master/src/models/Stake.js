const { DataTypes } = require("sequelize");
const { Decimal } = require("decimal.js");

module.exports = {
  define: (sequelize) => {
    return sequelize.define("stakes", {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL(100, 8),
        defaultValue: 0.0,
        allowNull: false,
        set(decimal) {
          this.setDataValue("balance", decimal.toFixed(8));
        },
        get() {
          return new Decimal(this.getDataValue("balance"));
        },
      },
      activeSince: DataTypes.DATE,
      depositAmount: {
        type: DataTypes.DECIMAL(100, 8),
        defaultValue: 0.0,
        allowNull: false,
        set(decimal) {
          this.setDataValue("depositAmount", decimal.toFixed(8));
        },
        get() {
          return new Decimal(this.getDataValue("depositAmount"));
        },
      },
      withdrawalAmount: {
        type: DataTypes.DECIMAL(100, 8),
        defaultValue: 0.0,
        allowNull: false,
        set(decimal) {
          this.setDataValue("withdrawalAmount", decimal.toFixed(8));
        },
        get() {
          return new Decimal(this.getDataValue("withdrawalAmount"));
        },
      },
    });
  },
};
