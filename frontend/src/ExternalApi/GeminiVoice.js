import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("API_KEY is undefined or empty");
  throw new Error(
    "Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file."
  );
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 40,
  maxOutputTokens: 1000,
};

let chat;
let chatHistory = [];

const travelPrompts = [
  {
    type: "general",
    prompt: `Provide key travel information for {location}. Include:
    1. Brief history
    2. Top attractions
    3. Local food
    4. Day trip option
    5. Cultural tip`,
  },
  {
    type: "itinerary",
    prompt: `Plan a {duration}-day itinerary for {location} for {traveler_type}. Detail:
    1. Morning activity
    2. Lunch suggestion
    3. Afternoon plan
    4. Evening option`,
  },
  {
    type: "budget",
    prompt: `Break down costs for a {duration}-day trip to {location} for {number_of_travelers} {traveler_type}. Include:
    1. Accommodation
    2. Transport
    3. Meals
    4. Activities
    5. Miscellaneous tips`,
  },
  {
    type: "transportation",
    prompt: `How to get around {location}? Cover:
    1. Public transit
    2. Taxis/rideshares
    3. Car rentals
    4. Walking/cycling
    5. Local methods`,
  },
  {
    type: "accommodation",
    prompt: `Suggest {budget_level} accommodation in {location} for {traveler_type}. Include:
    1. Name & details
    2. Cost
    3. Nearby highlights
    4. Feature to note`,
  },
];

const createPrompt = (userInput) => {
  let selectedPrompt =
    travelPrompts.find((p) => userInput.toLowerCase().includes(p.type)) ||
    travelPrompts[0];
  let filledPrompt = selectedPrompt.prompt;

  // Replace placeholders with generic terms if specific info isn't provided
  filledPrompt = filledPrompt.replace(/{location}/g, "the destination");
  filledPrompt = filledPrompt.replace(/{duration}/g, "your trip");
  filledPrompt = filledPrompt.replace(/{traveler_type}/g, "travelers");
  filledPrompt = filledPrompt.replace(/{number_of_travelers}/g, "your group");
  filledPrompt = filledPrompt.replace(/{budget_level}/g, "your");

  return `You are Triplo, an AI travel assistant. Provide travel details as requested: "${userInput}".

${filledPrompt}

Keep the response concise and suitable for voice interactions, highlighting key information effectively.`;
};

const isGreeting = (input) => {
  const greetings = ["hi", "hello", "hey", "greetings", "howdy"];
  return greetings.some((greeting) => input.toLowerCase().includes(greeting));
};

export const initializeChat = () => {
  chat = model.startChat({
    generationConfig,
    history: [],
  });
  chatHistory = [];
};

export const sendMessage = async (userInput) => {
  if (!chat) {
    initializeChat();
  }

  if (isGreeting(userInput)) {
    const greeting =
      "Hello! I'm Triplo, your travel buddy! How can I Assist you today?";
    chatHistory.push({ role: "model", parts: greeting });
    return greeting;
  }

  const prompt = createPrompt(userInput);
  chatHistory.push({ role: "user", parts: userInput });

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response.text().trim();
    chatHistory.push({ role: "model", parts: response });

    // Limit chat history to last 10 messages to prevent context overflow
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }

    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    return "I'm sorry, there was an error processing your request. Please try again later.";
  }
};

export const getChatHistory = () => {
  return chatHistory;
};
