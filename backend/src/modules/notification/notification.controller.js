const notificationService =
require("./notification.service");

exports.getNotifications =
async (req, res) => {

  const notifications =
    await notificationService.getNotifications(
      req.user._id
    );

  res.status(200).json({

    success: true,

    data: notifications,

  });

};

exports.markAsRead =
async (req, res) => {

  const notification =
    await notificationService.markAsRead(
      req.params.id
    );

  res.status(200).json({

    success: true,

    message: "Notification marked as read",

    data: notification,

  });

};

exports.markAllAsRead =
async (req, res) => {

  await notificationService.markAllAsRead(
    req.user._id
  );

  res.status(200).json({

    success: true,

    message: "All notifications marked as read",

  });

};

exports.deleteNotification =
async (req, res) => {

  await notificationService.deleteNotification(
    req.params.id
  );

  res.status(200).json({

    success: true,

    message: "Notification deleted",

  });

};

exports.getPreferences = async (req, res) => {
  const preferences =
    await notificationService.getPreferences(
      req.user._id
    );

  res.status(200).json({
    success: true,
    data: preferences,
  });
};

exports.updatePreferences = async (req, res) => {
  const preferences =
    await notificationService.updatePreferences(
      req.user._id,
      req.body
    );

  res.status(200).json({
    success: true,
    message: "Notification preferences updated",
    data: preferences,
  });
};

exports.sendDailyDigest = async (req, res) => {
  const result =
    await notificationService.sendDailyDigest(
      req.user._id
    );

  res.status(200).json({
    success: true,
    data: result,
  });
};
