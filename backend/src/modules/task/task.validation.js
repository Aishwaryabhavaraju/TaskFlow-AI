const { body } = require("express-validator");

exports.createTaskValidation = [

  body("title")
    .trim()
    .notEmpty(),

  body("project")
    .notEmpty(),

  body("board")
    .notEmpty(),

  body("columnId")
    .notEmpty(),

];