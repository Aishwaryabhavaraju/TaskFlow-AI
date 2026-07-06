const express = require("express");

const router = express.Router();

const { protect } =
require("../auth/auth.middleware");

const upload =
require("../../middleware/upload");

const {
  uploadAttachment,
  getTaskAttachments,
  deleteAttachment,
} = require("./attachment.controller");

router.post(
  "/",
  protect,
  upload.single("file"),
  uploadAttachment
);

router.get(
  "/task/:taskId",
  protect,
  getTaskAttachments
);

router.delete(
  "/:id",
  protect,
  deleteAttachment
);

module.exports = router;