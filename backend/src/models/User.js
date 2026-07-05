const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    phone: {
        type: String,
        default: "",
    },

    jobTitle: {
        type: String,
        default: "",
    },

    department: {
        type: String,
        default: "",
    },

    location: {
        type: String,
        default: "",
    },

    skills: [{
        type: String
    }],

    website: {
        type: String,
        default: "",
    },

    github: {
        type: String,
        default: "",
    },

    linkedin: {
        type: String,
        default: "",
    },

    timezone: {
        type: String,
        default: "Asia/Kolkata",
    },

    role: {
        type: String,
        enum: ["admin", "manager", "user"],
        default: "user",
    },

    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active",
    },

    lastLogin: {
        type: Date,
    },

    emailVerifiedAt: Date,

    isVerified: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);