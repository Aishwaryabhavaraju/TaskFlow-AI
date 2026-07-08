const axios = require("axios");
const Notification = require("../../models/Notification");
const User = require("../../models/User");
const sendEmail = require("../../services/emailService");
const { emitToUser } = require("../../socket");

const notificationTypePreference = {
  TASK_ASSIGNED: "taskUpdates",
  TASK_UPDATED: "taskUpdates",
  TASK_COMPLETED: "taskUpdates",
  TASK_MOVED: "taskUpdates",
  TASK_DUE: "taskUpdates",
  COMMENT: "taskUpdates",
  MENTION: "mentions",
};

const getPreference = (user, key, fallback = true) => {
  const preferences = user.notificationPreferences || {};
  return preferences[key] !== undefined ? preferences[key] : fallback;
};

const postWebhook = async (url, payload) => {
  if (!url) return false;

  try {
    await axios.post(url, payload);
    return true;
  } catch (error) {
    return false;
  }
};

const createNotification = async (data, options = {}) => {
  const recipient = await User.findById(data.recipient).select(
    "email firstName notificationPreferences"
  );

  if (!recipient) return null;

  const preferenceKey = notificationTypePreference[data.type];
  if (preferenceKey && !getPreference(recipient, preferenceKey)) {
    return null;
  }

  const channels = {
    inApp: getPreference(recipient, "inApp"),
    email: options.email ?? getPreference(recipient, "email"),
    slack: options.slack ?? getPreference(recipient, "slack", false),
    discord: options.discord ?? getPreference(recipient, "discord", false),
    push: options.push ?? getPreference(recipient, "push", false),
  };

  const notification = await Notification.create({
    ...data,
    channels,
  });

  const populatedNotification = await Notification.findById(notification._id)
    .populate("sender", "firstName lastName profilePicture")
    .populate("task", "title status dueDate")
    .populate("project", "name");

  if (channels.inApp) {
    emitToUser(
      data.recipient,
      "notification:new",
      populatedNotification
    );
  }

  if (channels.email) {
    try {
      await sendEmail({
        email: recipient.email,
        subject: data.title,
        html: `<p>${data.message}</p>`,
      });
    } catch (error) {
      channels.email = false;
    }
  }

  if (channels.slack) {
    await postWebhook(process.env.SLACK_WEBHOOK_URL, {
      text: `${data.title}\n${data.message}`,
    });
  }

  if (channels.discord) {
    await postWebhook(process.env.DISCORD_WEBHOOK_URL, {
      content: `**${data.title}**\n${data.message}`,
    });
  }

  return populatedNotification;
};

const createNotifications = async (recipients, data, options = {}) => {
  const uniqueRecipients = [
    ...new Set(recipients.filter(Boolean).map((id) => id.toString())),
  ];

  const created = [];

  for (const recipient of uniqueRecipients) {
    const notification = await createNotification(
      {
        ...data,
        recipient,
      },
      options
    );

    if (notification) created.push(notification);
  }

  return created;
};

const getNotifications = async (userId) => {

  return await Notification.find({

    recipient: userId,

    isDeleted: false,

  })
    .populate(
      "sender",
      "firstName lastName profilePicture"
    )
    .populate("task", "title status dueDate")
    .populate("project", "name")
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

const getPreferences = async (userId) => {
  const user = await User.findById(userId).select("notificationPreferences");
  return user.notificationPreferences;
};

const updatePreferences = async (userId, preferences) => {
  const allowed = [
    "inApp",
    "email",
    "mentions",
    "taskUpdates",
    "dailyDigest",
    "slack",
    "discord",
    "push",
  ];

  const update = {};

  for (const key of allowed) {
    if (preferences[key] !== undefined) {
      update[`notificationPreferences.${key}`] = Boolean(preferences[key]);
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: update },
    { new: true }
  ).select("notificationPreferences");

  return user.notificationPreferences;
};

const sendDailyDigest = async (userId) => {
  const user = await User.findById(userId).select(
    "email notificationPreferences"
  );

  if (!user || !getPreference(user, "dailyDigest", false)) {
    return { sent: false, reason: "Daily digest is disabled" };
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const notifications = await Notification.find({
    recipient: userId,
    isDeleted: false,
    createdAt: { $gte: since },
  }).sort({ createdAt: -1 });

  if (!notifications.length) {
    return { sent: false, reason: "No notifications to digest" };
  }

  const items = notifications
    .map((notification) => `<li>${notification.title}: ${notification.message}</li>`)
    .join("");

  await sendEmail({
    email: user.email,
    subject: "Your TaskFlow daily digest",
    html: `<h2>TaskFlow daily digest</h2><ul>${items}</ul>`,
  });

  return { sent: true, count: notifications.length };
};

module.exports = {
  createNotification,
  createNotifications,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getPreferences,
  updatePreferences,
  sendDailyDigest,
};
