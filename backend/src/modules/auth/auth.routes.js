const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("./auth.controller");

const protect = require("./auth.middleware");

const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("./auth.validation");

// Public Routes
router.post(
  "/register",
  registerValidation,
  register
);

router.post(
  "/login",
  loginValidation,
  login
);

router.post(
    "/forgot-password",
    forgotPasswordValidation,
    forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPasswordValidation,
  resetPassword
);

router.post("/logout", logout);

// Private Route
router.get(
  "/me",
  protect,
  getMe
);

module.exports = router;