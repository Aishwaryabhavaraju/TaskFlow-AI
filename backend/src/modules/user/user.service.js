const User = require("../../models/User");
const cloudinary = require("../../config/cloudinary");
const streamifier = require("streamifier");

const getProfile = async (userId) => {
    return await User.findById(userId).select("-password");
};

const updateProfile = async (userId, data) => {
    return await User.findByIdAndUpdate(
        userId,
        data,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
};

const uploadProfilePicture = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "taskflow-ai/profile-pictures",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const searchUsers = async (query) => {

  return await User.find({

    $or: [

      {
        firstName: {
          $regex: query,
          $options: "i",
        },
      },

      {
        lastName: {
          $regex: query,
          $options: "i",
        },
      },

      {
        username: {
          $regex: query,
          $options: "i",
        },
      },

      {
        email: {
          $regex: query,
          $options: "i",
        },
      },

    ],

  }).select("-password");

};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfilePicture,
    searchUsers,
};