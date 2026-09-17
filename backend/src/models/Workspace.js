const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Workspace name is required"],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["Owner", "Admin", "Manager", "Member", "Viewer"],
          default: "Member",
        },
      },
    ],
    defaultRole: {
      type: String,
      enum: ["Admin", "Manager", "Member", "Viewer"],
      default: "Member",
    },
    visibility: {
      type: String,
      enum: ["Private", "Team visible", "Organization visible"],
      default: "Private",
    },
    plan: {
      type: String,
      default: "Standard Plan",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
