const express = require("express");
const upload = require("../../config/multer");
const router = express.Router();

const {
  protect,
} = require("../auth/auth.middleware");

const {
  createTeam,
  getMyTeams,
  getTeam,
  inviteMember,
  acceptInvitation,
  rejectInvitation,
  leaveTeam,
  removeMember,
  updateMemberRole,
  transferOwnership,
  searchTeams,
  uploadTeamLogo,
} = require("./team.controller");

const {
  createTeamValidation,
} = require("./team.validation");

router.post(
  "/",
  protect,
  createTeamValidation,
  createTeam
);

router.get(
  "/",
  protect,
  getMyTeams
);

router.get(
  "/:id",
  protect,
  getTeam
);

router.post(
  "/:id/invite",
  protect,
  inviteMember
);

router.post(
  "/invite/:invitationId/accept",
  protect,
  acceptInvitation
);

router.post(
  "/invite/:invitationId/reject",
  protect,
  rejectInvitation
);

router.delete(
  "/:id/leave",
  protect,
  leaveTeam
);

router.delete(
  "/:id/member/:memberId",
  protect,
  removeMember
);

router.put(
  "/:id/member/:memberId/role",
  protect,
  updateMemberRole
);

router.put(
  "/:id/transfer-owner",
  protect,
  transferOwnership
);

router.get(
  "/search",
  protect,
  searchTeams
);

router.post(
  "/:id/logo",
  protect,
  upload.single("logo"),
  uploadTeamLogo
);

module.exports = router;