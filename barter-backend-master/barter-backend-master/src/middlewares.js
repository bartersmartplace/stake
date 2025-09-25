const { validationResult } = require("express-validator");

const formatter = (error) => `${error.location}/${error.path}: ${error.msg}`;

const validate = (...checks) => {
  return [
    ...checks,
    (req, res, next) => {
      try {
        validationResult(req)
          .formatWith(formatter)
          .throw();
        next();
      } catch (e) {
        const errors = e.array({ onlyFirstError: true });

        res.status(400).json({ error: errors[0] });
      }
    },
  ];
};


module.exports = {
  validate,
};
