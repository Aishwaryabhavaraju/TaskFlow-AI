const Team = require("../../models/Team");
const TeamInvitation = require("../../models/TeamInvitation");
const User = require("../../models/User");
const cloudinary = require("../../config/cloudinary");
const streamifier = require("streamifier");

const createTeam = async (teamData) => {
  return await Team.create(teamData);
};

const getTeams = async (userId) => {
  return await Team.find({
    "members.user": userId,
    isDeleted: false,
  })
    .populate("owner", "firstName lastName email profilePicture")
    .populate(
      "members.user",
      "firstName lastName email profilePicture"
    );
};

const getTeamById = async (id) => {
  return await Team.findById(id)
    .populate("owner", "firstName lastName email profilePicture")
    .populate(
      "members.user",
      "firstName lastName email profilePicture"
    );
};

const inviteMember = async (
  teamId,
  senderId,
  email
) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const existingInvite =
    await TeamInvitation.findOne({
      team: teamId,
      receiver: user._id,
      status: "pending",
    });

  if (existingInvite) {
    throw new Error(
      "Invitation already exists"
    );
  }

  return await TeamInvitation.create({
    team: teamId,
    sender: senderId,
    receiver: user._id,
  });

};

const acceptInvitation = async (
  invitationId,
  userId
) => {

  const invitation =
    await TeamInvitation.findById(invitationId);

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  invitation.status = "accepted";

  await invitation.save();

  await Team.findByIdAndUpdate(
    invitation.team,
    {
      $push: {
        members: {
          user: userId,
          role: "member",
          status: "accepted",
        },
      },
    }
  );

  return invitation;

};

const rejectInvitation = async (
  invitationId
) => {

  const invitation =
    await TeamInvitation.findById(invitationId);

  invitation.status = "rejected";

  await invitation.save();

  return invitation;

};

const leaveTeam = async (
  teamId,
  userId
) => {

  return await Team.findByIdAndUpdate(

    teamId,

    {
      $pull: {
        members: {
          user: userId,
        },
      },
    },

    {
      new: true,
    }

  );

};

const removeMember = async (
  teamId,
  memberId
) => {

  return await Team.findByIdAndUpdate(

    teamId,

    {
      $pull: {
        members: {
          user: memberId,
        },
      },
    },

    {
      new: true,
    }

  );

};

const updateMemberRole = async (
  teamId,
  memberId,
  role
) => {

  return await Team.updateOne(
    {
      _id: teamId,
      "members.user": memberId,
    },
    {
      $set: {
        "members.$.role": role,
      },
    }
  );

};

const transferOwnership = async (
  teamId,
  newOwnerId
) => {

  const team =
    await Team.findById(teamId);

  team.owner = newOwnerId;

  team.members.forEach((member) => {

    if (
      member.user.toString() ===
      newOwnerId
    ) {
      member.role = "owner";
    } else if (
      member.role === "owner"
    ) {
      member.role = "admin";
    }

  });

  await team.save();

  return team;

};

const searchTeams = async (
  keyword
) => {

  return await Team.find({

    name: {
      $regex: keyword,
      $options: "i",
    },

    isDeleted: false,

  });

};

const uploadTeamLogo = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "taskflow-ai/team-logos",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  inviteMember,
  acceptInvitation,
  rejectInvitation,
  leaveTeam,
  removeMember,
  updateMemberRole,
  transferOwnership,
  searchTeams,
  uploadTeamLogo,
};
