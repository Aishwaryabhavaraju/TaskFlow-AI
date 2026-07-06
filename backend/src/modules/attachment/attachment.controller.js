const attachmentService = require("./attachment.service");
const Task = require("../../models/Task");

exports.uploadAttachment = async (req, res) => {

  const attachment =
    await attachmentService.createAttachment({

      fileName: req.file.filename,

      originalName: req.file.originalname,

      fileUrl: req.file.path,

      publicId: req.file.filename,

      fileType: req.file.mimetype,

      fileSize: req.file.size,

      uploadedBy: req.user._id,

      task: req.body.task,

    });

  await Task.findByIdAndUpdate(
    req.body.task,
    {
      $push: {
        attachments: attachment._id,
      },
    }
  );

  res.status(201).json({

    success: true,

    message: "File uploaded successfully",

    data: attachment,

  });

};

exports.getTaskAttachments =
async (req, res) => {

  const attachments =
    await attachmentService.getTaskAttachments(
      req.params.taskId
    );

  res.status(200).json({
    success: true,
    data: attachments,
  });

};

exports.deleteAttachment =
async (req, res) => {

  await attachmentService.deleteAttachment(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Attachment deleted successfully",
  });

};