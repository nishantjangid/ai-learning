import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import GLOBAL from "../shared/envs_enum.js";

export const todaysWeather = async (city) => {
  const response = await fetch(
    `${GLOBAL.WEATHER_APP_BASE_URL}/current.json?key=${GLOBAL.WEATHER_APP_API_KEY}&q=${city}`,
  );
  const raw_json = await response.json();
  return {
    city: raw_json.location.name,
    country: raw_json.location.country,
    temp_c: raw_json.current.temp_c,
    condition: raw_json.current.condition.text,
    humidity: raw_json.current.humidity,
  };
};

export const convertTemperature = async (celsius) => {
  const fahrenheit = (celsius * 9/5) + 32;
  return {
    celsius: celsius,
    fahrenheit: fahrenheit.toFixed(2),
    difference: (fahrenheit - celsius).toFixed(2)
  };
};
