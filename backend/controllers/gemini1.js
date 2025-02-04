 const axios = require('axios');
// const dotenv = require('dotenv');
// dotenv.config(); // Load API key from .env file

// API Configuration
const API_KEY = process.env.GEMENI_API_KEY;
const API_URL = "https://api.generativeai.google/v1beta2/models/gemini-1.5-flash:generateText"; // Replace with actual endpoint
console.log(API_KEY)
// Model Configuration
const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  top_k: 40,
  max_output_tokens: 8192,
  response_mime_type: "text/plain",
};

async function generateTravelPlan(userPreferences, startDate, endDate, budget) {
  // Format the preferences into a prompt
  const preferenceDetails = JSON.stringify(userPreferences, null, 2);
  const prompt = `
    I want to travel to Mysore for a 3-day trip with a budget of ${budget} INR. 
    The user has provided the following preferences:

    Preferences: ${preferenceDetails}
    Dates: ${startDate} to ${endDate}

    Please create a detailed travel plan based on the given preferences, including hotel, travel, restaurant, and attractions recommendations, keeping the budget in mind.
  `;

  // HTTP Request Payload
  const payload = {
    prompt: prompt,
    model: "gemini-1.5-flash",
    ...generationConfig,
  };

  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Generated Travel Plan:", response.data.text);
  } catch (error) {
    console.error("Error generating travel plan:", error.response?.data || error.message);
  }
}

// Example data
const userPreferences = [
  { category: 'hotel', location: ['Hotel A', 'Hotel B', 'Hotel C'] },
  { category: 'restaurant', location: ['Restaurant X', 'Restaurant Y'] },
  { category: 'attraction', location: ['Attraction 1', 'Attraction 2'] },
  { category: 'travel', location: ['Train', 'Cab'] },
];

const startDate = '2024-12-05';
const endDate = '2024-12-08';
const budget = 20000; // 20,000 INR

// Generate and log the travel plan
generateTravelPlan(userPreferences, startDate, endDate, budget);
