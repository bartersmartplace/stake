const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ERC20Module", (m) => {
  const erc20 = m.contract("ERC20", ["Barter", "BRTR"]);

  return { erc20 };
});
