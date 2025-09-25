# Smart contract

## Instructions
Beforehand you have to install hardhat and solc, Solidity compiler, which should be automatically fetched before you run
```bash
$ npx hardhat compile
```

Once contract is compile you can deploy it via hardhat helper supplying constructor arguments via hardhat ignition module, create on with predefined template.

Example of module `ignition/modules/StakingBarter.js`
```js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("StakingBarterModule", (m) => {
  const stakingBarter = m.contract("StakingBarter", [
    "0x0000000000000000000000000000000000000000", // initialOwner
    "0x0000000000000000000000000000000000000000", // _stakeToken
    100_00000000n, // _minBalance
    16250000_00000000n, // _breakpoint
    2592000_00n, // _denominator
    "Staked BRTR", // name_
    "stBRTR", // symbol_
  ]);

  return { stakingBarter };
});
```

To use this module run the command specifying network via --network parameter
```bash
$ npx hardhat ignition deploy ./ignition/modules/StakingBarter.js --network <network>
```
