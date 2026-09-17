const { body } = require("express-validator");

exports.createProjectValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required"),

  body("team")
    .optional(),

  body("priority")
    .optional()
    .isIn([
      "Low",
      "Medium",
      "High",
      "Critical",
    ]),

];