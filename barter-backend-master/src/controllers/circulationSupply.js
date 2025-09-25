const config = require("../config");
const stakingTokenAbi = require("../stakingToken.abi.js");
const TokenAbi = require("../token.abi.js");
const { Decimal } = require("decimal.js");
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(config.NODE_URI);
const contract = new ethers.Contract(config.STAKE_TOKEN_ADDRESS, stakingTokenAbi, provider);

const decimal = (v) => new Decimal(v.toString());
const nan = decimal(NaN);

class Cache {
  #data;

  constructor() {
    this.#data = {};
  }

  set(name, value, ttl) {
    this.#data[name] = {
      value,
      expires: Date.now() + ttl,
    };
  }

  get(name) {
    return this.#data[name];
  }
}

const getStakingPool = async () => {
  const pending = await contract.getPending();
  return decimal(pending).div(config.STAKE_TOKEN_DENOMINATOR).floor();
};



class CirculationSupplyController {
  #cache;
  #retries;

  constructor(retries) {
    this.#retries = retries;
    this.#cache = new Cache();
  }

  async #withRetries(func) {
    for (const _ of Array(this.#retries)) {
      try { return await func(); } catch {}
    }

    return null;
  }

  async #getCachedValue({ name, getter, defaultValue, ttl }) {
    const cacheEntity = this.#cache.get(name);

    if (cacheEntity?.expires > Date.now())
      return cacheEntity.value;

    const value = await this.#withRetries(getter);

    if (value === null)
      return (cacheEntity) ? cacheEntity.value : defaultValue;

    this.#cache.set(name, value, ttl);

    return value;
  }

  async circulationSupplyInfo(req, res) {
    const stakingPool = await this.#getCachedValue({
      name: "stakingPool",
      getter: getStakingPool,
      defaultValue: nan,
      ttl: config.TOKENINFO_CACHE_TTL,
    });

    const distributedAmount = config.INITIAL_STAKING_POOL.sub(stakingPool).floor();

    res.status(200).json({
      circulationSupply: (Number(config.INITIAL_STAKING_POOL) + Number(distributedAmount)).toFixed(8),
    });
  }

  async totalSupplyInfo(req, res) {
    const contract = new ethers.Contract(config.TOKEN_ADDRESS, TokenAbi, provider);
    const totalSupply = await contract.totalSupply()
    const totalSupplyInBrtr = Number(totalSupply) / 10**config.STAKE_TOKEN_DECIMALS
    res.status(200).json({
      totalSupply: Number(totalSupplyInBrtr).toFixed(8),
    });
  }
};

module.exports = CirculationSupplyController;
