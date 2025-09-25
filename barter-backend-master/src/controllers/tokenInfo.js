const axios = require("axios");
const config = require("../config");
const stakingTokenAbi = require("../stakingToken.abi.js");
const { Decimal } = require("decimal.js");
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(config.NODE_URI);
const contract = new ethers.Contract(config.STAKE_TOKEN_ADDRESS, stakingTokenAbi, provider);
const coingeckoPriceUrl = ( "https://api.coingecko.com/api/v3/simple/price"
  + `?ids=${config.COINGECKO_TOKEN_ID}&vs_currencies=${config.COINGECKO_FIAT_ID}` );

const decimal = (v) => new Decimal(v.toString());
const monthMultiplier = decimal(30 * 24 * 60 * 60 * 100); // days, hours, minutes, seconds, percentage
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

const getTokenPrice = async () => {
  const response = await axios.get(coingeckoPriceUrl);
  return decimal(response.data[config.COINGECKO_TOKEN_ID][config.COINGECKO_FIAT_ID]).toFixed(4);
};

const getTotalValueLocked = async () => {
  const totalSupply = await contract.totalSupply();
  return decimal(totalSupply).div(config.STAKE_TOKEN_DENOMINATOR).floor();
};

const getStakingPool = async () => {
  const pending = await contract.getPending();
  return decimal(pending).div(config.STAKE_TOKEN_DENOMINATOR).floor();
};

const getSlope = async () => {
  const slope = await contract.getSlope();
  return decimal(slope).div(config.STAKE_TOKEN_DENOMINATOR);
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
      distributedAmount: (32500000 + Number(distributedAmount)).toFixed(4),
    });
  }
};

class TokenInfoController {
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

  async tokenInfo(req, res) {
    const [tokenPrice, totalValueLocked, stakingPool, slope] = await Promise.all([
      this.#getCachedValue({
        name: "tokenPrice",
        getter: getTokenPrice,
        defaultValue: nan,
        ttl: config.TOKENINFO_COINGECKO_CACHE_TTL,
      }),
      this.#getCachedValue({
        name: "totalValueLocked",
        getter: getTotalValueLocked,
        defaultValue: nan,
        ttl: config.TOKENINFO_CACHE_TTL,
      }),
      this.#getCachedValue({
        name: "stakingPool",
        getter: getStakingPool,
        defaultValue: nan,
        ttl: config.TOKENINFO_CACHE_TTL,
      }),
      this.#getCachedValue({
        name: "slope",
        getter: getSlope,
        defaultValue: nan,
        ttl: config.TOKENINFO_CACHE_TTL,
      }),
    ]);

    const distributedAmount = config.INITIAL_STAKING_POOL.sub(stakingPool).floor();
    const distributedAmountPrice = distributedAmount.mul(tokenPrice).toFixed(4);

    const calculatedMounthlyRate = slope.mul(monthMultiplier).div(totalValueLocked);
    const monthlyRate = (!calculatedMounthlyRate.isNaN())
      ? calculatedMounthlyRate
      : config.MONTHLY_RATE;

    res.status(200).json({
      tokenInfo: {
        tokenPrice,
        totalValueLocked,
        stakingPool,
        distributedAmount,
        distributedAmountPrice,
        monthlyRate: monthlyRate.toFixed(4),
        tokenAddress: config.TOKEN_ADDRESS,
        stakingTokenAddress: config.STAKE_TOKEN_ADDRESS,
      },
    });
  }
};

module.exports = TokenInfoController, CirculationSupplyController;
