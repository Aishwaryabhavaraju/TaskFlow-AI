const { body } = require("express-validator");

exports.updateProfileValidation = [

    body("firstName")
        .optional()
        .trim(),

    body("lastName")
        .optional()
        .trim(),

    body("bio")
        .optional()
        .isLength({ max: 500 }),

    body("phone")
        .optional(),

    body("website")
        .optional()
        .isURL(),

];

exports.changePasswordValidation = [

  body("currentPassword")
    .notEmpty(),

  body("newPassword")
    .isLength({
      min: 6,
    }),

];