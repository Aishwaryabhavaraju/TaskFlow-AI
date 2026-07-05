const { body } = require("express-validator");

exports.registerValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),

  body("username")
    .notEmpty()
    .withMessage("Username is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .notEmpty()
    .withMessage("Password required"),
];

exports.forgotPasswordValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email required"),
];

exports.resetPasswordValidation = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];