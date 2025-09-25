const express = require("express");

const createRouter = (tokenInfoController) => {
  const router = express.Router();

  router.get("/tokenInfo",
    (req, res) => tokenInfoController.tokenInfo(req, res),
  );

  return router;
};

module.exports = {
  createRouter,
};
