const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.DB_URI, {
  logging: false,
});

const NetworkState = require("./NetworkState").define(sequelize);
const Stake = require("./Stake").define(sequelize);

module.exports = {
  sequelize,

  NetworkState,
  Stake,
};
