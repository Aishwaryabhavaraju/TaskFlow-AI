const { body } = require("express-validator");

exports.createProjectValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required"),

  body("team")
    .notEmpty()
    .withMessage("Team ID is required"),

  body("priority")
    .optional()
    .isIn([
      "Low",
      "Medium",
      "High",
      "Critical",
    ]),

];