const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    uploadProfilePicture,

} = require("./user.controller");

const {
    updateProfileValidation,
} = require("./user.validation");

const {
    protect,
} = require("../auth/auth.middleware");

router.get(
    "/profile",
    protect,
    getProfile
);

router.put(
    "/profile",
    protect,
    updateProfileValidation,
    updateProfile
);

router.post(
  "/profile-picture",
  protect,
  upload.single("profilePicture"),
  uploadProfilePicture
);

router.delete(
  "/profile-picture",
  protect,
  deleteProfilePicture
);

router.put(
  "/change-password",
  protect,
  changePasswordValidation,
  changePassword
);

router.get(
  "/search",
  protect,
  searchUsers
);

router.get(
  "/:id",
  protect,
  getUserById
);

router.delete(
  "/deactivate",
  protect,
  deactivateAccount
);

module.exports = router;