import api from "../api/axios";

const unwrap = (response) =>
  response.data?.result ??
  response.data?.data ??
  response.data;

export const generateDescription = async (title) => {
  const response = await api.post(
    "/ai/task-description",
    { title }
  );

  return {
    ...response.data,
    description:
      response.data.description ||
      response.data.data,
  };
};

export const generateSuggestions = async (task) => {
  const response = await api.post(
    "/ai/task-suggestions",
    task
  );

  return unwrap(response);
};

export const runAIFeature = async (
  feature,
  payload
) => {
  const response = await api.post(
    `/ai/${feature}`,
    payload
  );

  return unwrap(response);
};

export const askAI = async (payload) =>
  runAIFeature("chat", payload);

export const sprintPlanning = async (payload) =>
  runAIFeature("sprint-planning", payload);

export const riskDetection = async (payload) =>
  runAIFeature("risk-detection", payload);

export const workloadBalancing = async (payload) =>
  runAIFeature("workload-balancing", payload);

export const taskPrioritization = async (payload) =>
  runAIFeature("task-prioritization", payload);

export const deadlinePrediction = async (payload) =>
  runAIFeature("deadline-prediction", payload);

export const meetingNotes = async (payload) =>
  runAIFeature("meeting-notes", payload);

export const projectSummary = async (payload) =>
  runAIFeature("project-summary", payload);

export const naturalLanguageTask = async (payload) =>
  runAIFeature("natural-language-task", payload);

export const productivityInsights = async (payload) =>
  runAIFeature("productivity-insights", payload);

export default {
  generateDescription,
  generateSuggestions,
  runAIFeature,
  askAI,
  sprintPlanning,
  riskDetection,
  workloadBalancing,
  taskPrioritization,
  deadlinePrediction,
  meetingNotes,
  projectSummary,
  naturalLanguageTask,
  productivityInsights,
};
