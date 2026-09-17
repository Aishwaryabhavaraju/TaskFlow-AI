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

const getApiKeys = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return [];
  return (user.apiKeys || []).map((item) => ({
    _id: item._id,
    provider: item.provider,
    model: item.model,
    key: item.key ? item.key.slice(0, 7) + "************" + item.key.slice(-4) : "Not configured",
    status: item.status || "Connected",
    createdAt: item.createdAt,
  }));
};

const saveApiKey = async (userId, { provider, model, key }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!user.apiKeys) user.apiKeys = [];

  const existingIndex = user.apiKeys.findIndex(
    (k) => k.provider.toLowerCase() === provider.toLowerCase()
  );

  if (existingIndex >= 0) {
    user.apiKeys[existingIndex].key = key;
    user.apiKeys[existingIndex].model = model || user.apiKeys[existingIndex].model;
    user.apiKeys[existingIndex].status = "Connected";
  } else {
    user.apiKeys.push({
      provider,
      model: model || "",
      key,
      status: "Connected",
    });
  }

  await user.save();
  return getApiKeys(userId);
};

const deleteApiKey = async (userId, provider) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (user.apiKeys) {
    user.apiKeys = user.apiKeys.filter(
      (k) => k.provider.toLowerCase() !== provider.toLowerCase()
    );
    await user.save();
  }

  return getApiKeys(userId);
};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfilePicture,
    searchUsers,
    getApiKeys,
    saveApiKey,
    deleteApiKey,
};