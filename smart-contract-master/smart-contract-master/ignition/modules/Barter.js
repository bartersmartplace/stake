const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BarterModule", (m) => {
  const barter = m.contract("Barter", ["Barter", "BRTR"]);

  return { barter };
});
