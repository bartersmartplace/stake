const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StakingBarterModule", (m) => {
  const stakingBarter = m.contract("StakingBarter", [
    "0xd35a9eee229cbd491306f69237eb4a290f4b6321", // initialOwner
    "0x3aa36ad1d2d537d840c462462e62228b3fd0edec", // _stakeToken
    100_00000000n, // _minBalance
    16250000_00000000n, // _breakpoint
    2592000_00n, // _denominator
    "Staked BRTR", // name_
    "stBRTR", // symbol_
  ]);

  return { stakingBarter };
});
