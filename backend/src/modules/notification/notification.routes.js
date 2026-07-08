const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getPreferences,
  updatePreferences,
  sendDailyDigest,
} = require("./notification.controller");

router.get(
  "/",
  protect,
  getNotifications
);

router.get(
  "/preferences",
  protect,
  getPreferences
);

router.put(
  "/preferences",
  protect,
  updatePreferences
);

router.post(
  "/digest",
  protect,
  sendDailyDigest
);

router.put(
  "/:id/read",
  protect,
  markAsRead
);

router.put(
  "/read-all",
  protect,
  markAllAsRead
);

router.delete(
  "/:id",
  protect,
  deleteNotification
);

module.exports = router;
