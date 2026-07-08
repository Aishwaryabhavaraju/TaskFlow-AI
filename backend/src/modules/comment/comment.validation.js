const { body } = require("express-validator");

exports.createCommentValidation = [
  body("task")
    .optional()
    .notEmpty()
    .withMessage("Task ID is required"),

  body("content")
    .if(body("text").not().exists())
    .trim()
    .notEmpty()
    .withMessage("Comment content is required"),

  body("text")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Comment content is required"),
];
