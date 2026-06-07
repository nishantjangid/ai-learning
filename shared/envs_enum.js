import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const GLOBAL = {
  model: process.env.model,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GROQ_API_URL: process.env.GROQ_API_URL,
  WEATHER_APP_API_KEY: process.env.weatherApiKey,
  WEATHER_APP_BASE_URL: process.env.weatherApiBaseUrl,
};

export default GLOBAL;
