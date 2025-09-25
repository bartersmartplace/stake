const express = require("express");
const { body } = require("express-validator");
const { rateLimit } = require("express-rate-limit");
const { validate } = require("../middlewares");

const createRouter = (submitController) => {
  const router = express.Router();

  router.post("/submit",
    rateLimit({
      windowMs: 60_000,
      limit: 5,
      legacyHeaders: false,
      standardHeaders: "draft-7",
    }),
    validate(
      body("email")
        .exists().withMessage("expected parameter is missing")
        .isEmail().withMessage("invalid email"),
      body("message")
        .notEmpty().withMessage("expected parameter is missing")
    ),
    (req, res) => submitController.submit(req, res),
  );

  return router;
};

module.exports = {
  createRouter,
};
