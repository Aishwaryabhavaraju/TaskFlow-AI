const { body } = require("express-validator");

exports.createTeamValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Team name is required"),

  body("description")
    .optional()
    .isLength({ max: 500 }),
];