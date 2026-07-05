const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "#3B82F6",
    },

    icon: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: true,
  }
);

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    boardType: {
      type: String,
      enum: ["kanban", "scrum"],
      default: "kanban",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    columns: [columnSchema],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Board", boardSchema);