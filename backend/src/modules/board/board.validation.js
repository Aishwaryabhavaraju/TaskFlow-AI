const { body } = require("express-validator");

exports.createBoardValidation = [

  body("name")
    .trim()
    .notEmpty(),

  body("project")
    .notEmpty(),

];