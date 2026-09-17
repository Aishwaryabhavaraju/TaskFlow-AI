const express = require("express");
const router = express.Router();
const {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceSettings,
  updateWorkspaceSettings,
  getWorkspaceMembers,
  inviteMember,
  updateMemberRole,
  removeMember,
  archiveWorkspace,
} = require("./workspace.controller");
const { protect } = require("../auth/auth.middleware");

router.use(protect);

router.get("/", getWorkspaces);
router.post("/", createWorkspace);
router.get("/:id", getWorkspaceById);
router.put("/:id", updateWorkspace);
router.delete("/:id", deleteWorkspace);

router.get("/:id/settings", getWorkspaceSettings);
router.put("/:id/settings", updateWorkspaceSettings);

router.get("/:id/members", getWorkspaceMembers);
router.post("/:id/invite", inviteMember);
router.put("/:id/members/:memberId/role", updateMemberRole);
router.delete("/:id/members/:memberId", removeMember);

router.patch("/:id/archive", archiveWorkspace);

module.exports = router;
