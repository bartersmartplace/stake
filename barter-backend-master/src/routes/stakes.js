const config = require("../config");
const express = require("express");
const { Decimal } = require("decimal.js");
const { ethers } = require("ethers");
const { query, param } = require("express-validator");
const { validate } = require("../middlewares");

const isDecimal = (value) => {
  try {
    new Decimal(value);
  } catch {
    return false;
  }

  return true;
};

const createRouter = (stakesController) => {
  const router = express.Router();

  router.get("/stakes",
    validate(
      query("offset")
        .default(0)
        .isInt().withMessage("invalid integer")
        .toInt(),
      query("limit")
        .default(config.DEFAULT_STAKE_PAGE)
        .isInt().withMessage("invalid integer")
        .isInt({
          min: config.MIN_STAKE_PAGE,
          max: config.MAX_STAKE_PAGE,
        }).withMessage(`unacceptable value (${config.MIN_STAKE_PAGE}-${config.MAX_STAKE_PAGE})`)
        .toInt(),
    ),
    (req, res) => stakesController.getStakes(req, res),
  );

  router.get("/stakes/predictRating",
    validate(
      query("amount")
        .exists().withMessage("expected parameter is missing")
        .custom(isDecimal).withMessage("invalid decimal")
        .customSanitizer((value) => new Decimal(value)),
      query("balanceNow")
        .exists().withMessage("expected parameter is missing")
        .custom(isDecimal).withMessage("invalid decimal")
        .customSanitizer((value) => new Decimal(value)),
    ),
    (req, res) => stakesController.predictRating(req, res),
  );

  router.get("/stakes/:address",
    validate(
      param("address")
        .exists().withMessage("expected parameter is missing")
        .custom((value) => value.length === 42).withMessage("invalid address")
        .customSanitizer((value) => ethers.getAddress(value.toLowerCase())),
    ),
    (req, res) => stakesController.getStake(req, res),
  );

  return router;
};

module.exports = {
  createRouter,
};
