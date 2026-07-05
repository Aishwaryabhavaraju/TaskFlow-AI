const userService = require("./user.service");
const User = require("../../models/User");

exports.getProfile = async (req, res) => {

    const user = await userService.getProfile(req.user._id);

    res.status(200).json({
        success: true,
        data: user,
    });

};

exports.updateProfile = async (req, res) => {

    const user = await userService.updateProfile(
        req.user._id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: user,
    });

};

exports.uploadProfilePicture = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image",
    });
  }

  const result = await userService.uploadProfilePicture(req.file);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      profilePicture: result.secure_url,
    },
    {
      new: true,
    }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile picture uploaded successfully",
    data: user,
  });
};

exports.deleteProfilePicture = async (req, res) => {

  const user = await User.findById(req.user._id);

  user.profilePicture = "";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile picture removed",
  });

};

exports.changePassword = async (req, res) => {

  const {

    currentPassword,

    newPassword,

  } = req.body;

  const user = await User.findById(req.user._id);

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password incorrect",
    });
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });

};

exports.searchUsers = async (req, res) => {

  const users = await userService.searchUsers(req.query.search || "");

  res.status(200).json({
    success: true,
    data: users,
  });

};

exports.getUserById = async (req, res) => {

  const user = await User.findById(req.params.id)
    .select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });

};

exports.deactivateAccount = async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      isDeleted: true,
      status: "inactive",
    }
  );

  res.status(200).json({
    success: true,
    message: "Account deactivated successfully",
  });

};