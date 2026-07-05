const Notification =
require("../../models/Notification");

const createNotification =
async (data) => {
  return await Notification.create(data);
};

const getNotifications =
async (userId) => {

  return await Notification.find({

    recipient: userId,

    isDeleted: false,

  })
    .populate(
      "sender",
      "firstName lastName profilePicture"
    )
    .sort({
      createdAt: -1,
    });

};

const markAsRead =
async (id) => {

  return await Notification.findByIdAndUpdate(

    id,

    {

      isRead: true,

      readAt: new Date(),

    },

    {

      new: true,

    }

  );

};

const markAllAsRead =
async (userId) => {

  return await Notification.updateMany(

    {

      recipient: userId,

      isRead: false,

    },

    {

      isRead: true,

      readAt: new Date(),

    }

  );

};

const deleteNotification =
async (id) => {

  return await Notification.findByIdAndUpdate(

    id,

    {

      isDeleted: true,

    },

    {

      new: true,

    }

  );

};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};