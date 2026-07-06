const aiService =
require("./ai.service");

exports.askAI =
async (req, res) => {

  const result =
    await aiService.generateResponse(
      req.body.prompt
    );

  res.status(200).json({

    success: true,

    data: result,

  });

};

exports.generateTaskDescription =
async (req, res) => {

  const prompt = `
Generate a professional task description.

Task Title:

${req.body.title}
`;

  const result =
    await aiService.generateResponse(prompt);

  res.status(200).json({

    success: true,

    data: result,

  });

};

exports.summarizeProject =
async (req, res) => {

  const prompt = `
Summarize this project:

${req.body.project}
`;

  const result =
    await aiService.generateResponse(prompt);

  res.status(200).json({

    success: true,

    data: result,

  });

};

exports.suggestPriority =
async (req, res) => {

  const prompt = `
Suggest a priority
(Low, Medium, High, Urgent)

Task:

${req.body.task}
`;

  const result =
    await aiService.generateResponse(prompt);

  res.status(200).json({

    success: true,

    data: result,

  });

};

exports.estimateTime =
async (req, res) => {

  const prompt = `
Estimate the time required
for this task.

${req.body.task}
`;

  const result =
    await aiService.generateResponse(prompt);

  res.status(200).json({

    success: true,

    data: result,

  });

};

exports.improveComment =
async (req, res) => {

  const prompt = `
Rewrite this comment professionally.

${req.body.comment}
`;

  const result =
    await aiService.generateResponse(prompt);

  res.status(200).json({

    success: true,

    data: result,

  });

};

exports.generateWeeklyReport =
async (req, res) => {

  const prompt = `
Create a weekly project report.

${req.body.data}
`;

  const result =
    await aiService.generateResponse(prompt);

  res.status(200).json({

    success: true,

    data: result,

  });

};