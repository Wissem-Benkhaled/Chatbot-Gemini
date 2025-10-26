// src/config/gemini.js
import axios from "axios";

const GEMINI_API_KEY = "AIzaSyBrhB6l2MTQWBt5mn89T7919Kq_LG5Yr-o";
const headers = {
  "Content-Type": "application/json",
  "x-goog-api-key": GEMINI_API_KEY
};

// ✅ Use text-only model
const baseURL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function callGemini(prompt) {
  const data = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const response = await axios.post(baseURL, data, { headers });
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
  } catch (error) {
    if (error.response) {
      console.error("Gemini API Error:", error.response.data);
      return `Error: ${error.response.data.error.message}`;
    } else {
      console.error("Gemini API Error:", error.message);
      return "Error: Unable to fetch response from Gemini API.";
    }
  }
}
