const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
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

    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    watchers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Critical",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "To Do",
        "In Progress",
        "Review",
        "Done",
      ],
      default: "To Do",
    },

    labels: [
      {
        type: String,
      },
    ],

    estimatedHours: {
        type: Number,
        default: 0,
    },

    actualHours: {
        type: Number,
        default: 0,
    },

    completedAt: Date,

    attachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment",
        },
    ],

    dueDate: Date,

    order: {
      type: Number,
      default: 0,
    },

    checklist: [
        {
            title: {
            type: String,
            required: true,
            trim: true,
            },

            completed: {
            type: Boolean,
            default: false,
            },

            completedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },

            completedAt: {
            type: Date,
            default: null,
            },
        },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
