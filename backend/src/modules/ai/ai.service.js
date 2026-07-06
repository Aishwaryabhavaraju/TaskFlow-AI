const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResponse = async (prompt) => {

  const response =
    await client.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [

        {
          role: "system",
          content:
            "You are an AI assistant for project management.",
        },

        {
          role: "user",
          content: prompt,
        },

      ],

    });

  return response.choices[0].message.content;

};

module.exports = {
  generateResponse,
};