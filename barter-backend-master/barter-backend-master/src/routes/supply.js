const express = require("express");

const createRouter = (supplyBrtrCirculatingController) => {
  const router = express.Router();

  router.get("/supply/circulating/brtr",
    (req, res) => supplyBrtrCirculatingController.circulationSupplyInfo(req, res),
  );

  router.get("/supply/total/brtr",
    (req, res) => supplyBrtrCirculatingController.totalSupplyInfo(req, res),
  );

  return router;
};

module.exports = {
  createRouter,
};