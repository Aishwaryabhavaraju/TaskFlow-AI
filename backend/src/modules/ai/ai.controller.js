const aiService = require("./ai.service");

const sendData = (res, data) => {
  res.status(200).json({
    success: true,
    data,
    result: data,
  });
};

exports.askAI = async (req, res) => {
  const result = await aiService.chatAssistant({
    ...req.body,
    message: req.body.prompt || req.body.message,
  });

  sendData(res, result);
};

exports.generateTaskDescription = async (req, res) => {
  const result = await aiService.generateResponse(`
Generate a professional task description.

Task Title:
${req.body.title}
`);

  res.status(200).json({
    success: true,
    data: result,
    description: result,
  });
};

exports.summarizeProject = async (req, res) => {
  const result = req.body.projectId
    ? await aiService.summarizeProject(req.body)
    : await aiService.generateResponse(`
Summarize this project:

${req.body.project}
`);

  sendData(res, result);
};

exports.suggestPriority = async (req, res) => {
  const result = await aiService.prioritizeTasks(
    req.body
  );

  sendData(res, result);
};

exports.estimateTime = async (req, res) => {
  const result = await aiService.generateResponse(`
Estimate the time required for this task.

${req.body.task}
`);

  sendData(res, result);
};

exports.improveComment = async (req, res) => {
  const result = await aiService.generateResponse(`
Rewrite this comment professionally.

${req.body.comment}
`);

  sendData(res, result);
};

exports.generateWeeklyReport = async (req, res) => {
  const result = await aiService.generateResponse(`
Create a weekly project report.

${req.body.data}
`);

  sendData(res, result);
};

exports.generateTaskSuggestions = async (req, res) => {
  const result = await aiService.taskSuggestions(
    req.body
  );

  sendData(res, result);
};

exports.sprintPlanning = async (req, res) => {
  sendData(
    res,
    await aiService.sprintPlanning(req.body)
  );
};

exports.riskDetection = async (req, res) => {
  sendData(
    res,
    await aiService.detectRisks(req.body)
  );
};

exports.workloadBalancing = async (req, res) => {
  sendData(
    res,
    await aiService.balanceWorkload(req.body)
  );
};

exports.taskPrioritization = async (req, res) => {
  sendData(
    res,
    await aiService.prioritizeTasks(req.body)
  );
};

exports.deadlinePrediction = async (req, res) => {
  sendData(
    res,
    await aiService.predictDeadlines(req.body)
  );
};

exports.meetingNotes = async (req, res) => {
  sendData(
    res,
    await aiService.generateMeetingNotes(req.body)
  );
};

exports.projectSummary = async (req, res) => {
  sendData(
    res,
    await aiService.summarizeProject(req.body)
  );
};

exports.chatAssistant = async (req, res) => {
  sendData(
    res,
    await aiService.chatAssistant(req.body)
  );
};

exports.naturalLanguageTask = async (req, res) => {
  sendData(
    res,
    await aiService.naturalLanguageTask({
      ...req.body,
      createdBy: req.user._id,
    })
  );
};

exports.productivityInsights = async (req, res) => {
  sendData(
    res,
    await aiService.productivityInsights(req.body)
  );
};
