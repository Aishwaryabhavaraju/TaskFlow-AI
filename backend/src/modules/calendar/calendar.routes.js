const express = require("express");
const router = express.Router();
const { getEvents } = require("./calendar.controller");
const { protect } = require("../auth/auth.middleware");

router.get("/events", protect, getEvents);

module.exports = router;
