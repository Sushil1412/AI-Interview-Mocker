import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing! Check your .env file.");
}

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to start a chat session
export const startChatSession = async () => {
  return model.startChat({
    generationConfig,
  });
};

// Function to send a prompt and get a response
export const sendPrompt = async (userPrompt) => {
  try {
    const chatSession = await startChatSession();

    // Wrap the prompt in an array with the "text" key
    const result = await chatSession.sendMessage([{ text: userPrompt }]);
    const response = await result.response;

    return response.text(); // Get the response text
  } catch (error) {
    console.error("Error sending prompt:", error);
    return "Error generating response. Please try again.";
  }
};

