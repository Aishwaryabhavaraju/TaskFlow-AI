const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    uploadProfilePicture,
    deleteProfilePicture,
    changePassword,
    searchUsers,
    getUserById,
    deactivateAccount,
    getApiKeys,
    saveApiKey,
    deleteApiKey,
} = require("./user.controller");

const {
    updateProfileValidation,
    changePasswordValidation,
} = require("./user.validation");

const {
    protect,
} = require("../auth/auth.middleware");
const upload = require("../../config/multer");

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
  "/api-keys",
  protect,
  getApiKeys
);

router.post(
  "/api-keys",
  protect,
  saveApiKey
);

router.delete(
  "/api-keys/:provider",
  protect,
  deleteApiKey
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