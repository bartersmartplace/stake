const config = require("./config");
const logger = require("./logger");
const stakingTokenAbi = require("./stakingToken.abi.js");
const { Decimal } = require("decimal.js");
const { ethers } = require("ethers");
const { sequelize, NetworkState, Stake } = require("./models");

const provider = new ethers.JsonRpcProvider(config.NODE_URI);
const contract = new ethers.Contract(config.STAKE_TOKEN_ADDRESS, stakingTokenAbi, provider);

const decimal = (v) => new Decimal(v);

const scanTransfers = async () => {
  const latestBlock = await provider.getBlockNumber() - config.WORKER_BLOCK_OFFSET;

  logger.log("stakes:scanTransfers", `latest block: ${latestBlock}`);

  const [scanTransfersState] = await NetworkState.findOrCreate({
    where: {
      name: "scanTransfers",
    },
    defaults: {
      value: config.STAKE_TOKEN_DEPLOY_BLOCK - 1,
    },
  });

  logger.log("stakes:scanTransfers", `stake transfers block state: ${scanTransfersState.value}`);

  const fromBlock = scanTransfersState.value + 1;

  if (fromBlock > latestBlock) {
    logger.log("stakes:scanTransfers", "already up to date");
    return;
  }

  const toBlock = Math.min(fromBlock + config.WORKER_BLOCK_STEP, latestBlock);

  const logs = await provider.getLogs({ address: config.STAKE_TOKEN_ADDRESS, fromBlock, toBlock });

  const transfers = logs
    .map((log) => contract.interface.parseLog(log))
    .filter((log) => log?.name === "Transfer")
    .map((log) => {
      const [fromAddress, toAddress, amount] = log.args;

      return {
        fromAddress: ethers.getAddress(fromAddress.toLowerCase()),
        toAddress: ethers.getAddress(toAddress.toLowerCase()),
        amount: decimal(amount.toString()).div(config.STAKE_TOKEN_DENOMINATOR),
      };
    });

  logger.log("stakes:scanTransfers", `retrieved ${transfers.length} transfers in ${fromBlock}-${toBlock} blocks`);

  await sequelize.transaction(async (t) => {
    // cached stakes here so we can buch save them later after processing all transfers
    const stakes = new Map();

    for (const transfer of transfers) {
      const address = (transfer.fromAddress === ethers.ZeroAddress)
        ? transfer.toAddress
        : transfer.fromAddress;

      // short curcuit closure helps write less code
      const stake = stakes.get(address) || await (async () => {
        const [stake, created] = await Stake.findOrCreate({
          where: { address },
          defaults: { address },
          transaction: t,
        });

        if (created)
          logger.log("stakes:scanTransfers", `new staker detected: ${stake.address}`);

        stakes.set(address, stake);

        return stake;
      })();

      if (transfer.fromAddress === address)
        stake.withdrawalAmount = stake.withdrawalAmount.add(transfer.amount);
      else
        stake.depositAmount = stake.depositAmount.add(transfer.amount);
    }

    // out of loop to minimize actual update queries
    for (const [, stake] of stakes)
      await stake.save({ transaction: t });

    scanTransfersState.value = toBlock;
    await scanTransfersState.save({ transaction: t });

    logger.log("stakes:scanTransfers", `stake transfers block state updated to ${scanTransfersState.value}`);
  });
};

const updateBalances = async () => {
  const stakes = await Stake.findAll();

  await sequelize.transaction(async (t) => {
    for (const stake of stakes) {
      const balanceValue = await contract.balanceOf(stake.address);
      const newBalance = decimal(balanceValue.toString())
        .div(config.STAKE_TOKEN_DENOMINATOR);

      if (stake.balance.cmp(config.MIN_STAKE_BALANCE) >= 0 && newBalance.cmp(config.MIN_STAKE_BALANCE) < 0)
        stake.activeSince = null;
      else if (stake.balance.cmp(config.MIN_STAKE_BALANCE) < 0 && newBalance.cmp(config.MIN_STAKE_BALANCE) >= 0)
        stake.activeSince = Date.now();

      stake.balance = newBalance;
      await stake.save({ transaction: t });
    }
  });

  logger.log("stakes:updateBalances", `${stakes.length} stakes have been updated`);
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  while (true) {
    await scanTransfers();
    await updateBalances();
    await sleep(config.WORKER_JOB_INTERVAL);
  };
})();
