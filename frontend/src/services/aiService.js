import api from "./api";

export const generateDescription = async (
  title
) => {

  const { data } = await api.post(
    "/ai/generate-description",
    {
      title,
    }
  );

  return data;

};

export const generateSuggestions = async (
    task
) => {

    const {data}=await api.post(
        "/ai/task-suggestions",
        task
    );

    return data;

};

export default {
  generateDescription,
  generateSuggestions,
};
