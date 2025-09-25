const { Decimal } = require("decimal.js");

const env = (parser, name, defaultValue) => {
  const value = process.env[name];

  if (value === undefined) {
    if (defaultValue === undefined)
      throw new Error(`required environment variable '${name}' is not set`);

    return defaultValue;
  }

  return parser(value);
};

const asIs = (v) => v;
const bigint = (v) => BigInt(v.replace(/[_]*/g, ""));
const decimal = (v) => new Decimal(v.replace(/[_]*/g, ""));
const float = (v) => Number.parseFloat(v.replace(/[_]*/g, ""));
const integer = (v) => Number.parseInt(v.replace(/[_]*/g, ""));
const list = (separator) => {
  return (v) => v.split(separator);
};

const getDenominator = (decimals) => {
  return new Decimal((10n ** BigInt(decimals)).toString());
};

// TODO: need workaround to make only required workers receive their variables
const API_PORT = env(integer, "BARTER_API_PORT");
const BOT_TOKEN = env(asIs, "BARTER_BOT_TOKEN");
const COINGECKO_FIAT_ID = env(asIs, "BARTER_COINGECKO_FIAT_ID");
const COINGECKO_TOKEN_ID = env(asIs, "BARTER_COINGECKO_TOKEN_ID");
const CORS_ORIGIN = env(list(","), "BARTER_CORS_ORIGIN");
const DB_URI = env(asIs, "BARTER_DB_URI");
const DEFAULT_STAKE_PAGE = env(integer, "BARTER_DEFAULT_STAKE_PAGE");
const INITIAL_STAKING_POOL = env(decimal, "BARTER_INITIAL_STAKING_POOL");
const MAX_STAKE_PAGE = env(integer, "BARTER_MAX_STAKE_PAGE");
const MIN_STAKE_BALANCE = env(decimal, "BARTER_MIN_STAKE_BALANCE");
const MIN_STAKE_PAGE = env(integer, "BARTER_MIN_STAKE_PAGE");
const MONTHLY_RATE = env(decimal, "BARTER_MONTHLY_RATE", decimal("1.30"));
const NODE_URI = env(asIs, "BARTER_NODE_URI");
const NOTIFY_TG_CHAT_ID = env(integer, "BARTER_NOTIFY_TG_CHAT_ID");
const STAKE_TOKEN_ADDRESS = env(asIs, "BARTER_STAKE_TOKEN_ADDRESS");
const STAKE_TOKEN_DECIMALS = env(integer, "BARTER_STAKE_TOKEN_DECIMALS");
const STAKE_TOKEN_DENOMINATOR = getDenominator(STAKE_TOKEN_DECIMALS);
const STAKE_TOKEN_DEPLOY_BLOCK = env(integer, "BARTER_STAKE_TOKEN_DEPLOY_BLOCK");
const TOKENINFO_CACHE_TTL = env(integer, "BARTER_TOKENINFO_CACHE_TTL");
const TOKENINFO_COINGECKO_CACHE_TTL = env(integer, "BARTER_TOKENINFO_COINGECKO_CACHE_TTL");
const TOKEN_ADDRESS = env(asIs, "BARTER_TOKEN_ADDRESS");
const WORKER_BLOCK_OFFSET = env(integer, "BARTER_WORKER_BLOCK_OFFSET");
const WORKER_BLOCK_STEP = env(integer, "BARTER_WORKER_BLOCK_STEP");
const WORKER_JOB_INTERVAL = env(integer, "BARTER_WORKER_JOB_INTERVAL");

module.exports = {
  API_PORT,
  BOT_TOKEN,
  COINGECKO_FIAT_ID,
  COINGECKO_TOKEN_ID,
  CORS_ORIGIN,
  DB_URI,
  DEFAULT_STAKE_PAGE,
  INITIAL_STAKING_POOL,
  MAX_STAKE_PAGE,
  MIN_STAKE_BALANCE,
  MIN_STAKE_PAGE,
  MONTHLY_RATE,
  NODE_URI,
  NOTIFY_TG_CHAT_ID,
  STAKE_TOKEN_ADDRESS,
  STAKE_TOKEN_DECIMALS,
  STAKE_TOKEN_DENOMINATOR,
  STAKE_TOKEN_DEPLOY_BLOCK,
  TOKENINFO_CACHE_TTL,
  TOKENINFO_COINGECKO_CACHE_TTL,
  TOKEN_ADDRESS,
  WORKER_BLOCK_OFFSET,
  WORKER_BLOCK_STEP,
  WORKER_JOB_INTERVAL,
};
