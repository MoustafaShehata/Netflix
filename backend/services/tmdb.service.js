import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchDataFromTMDB = async (url) => {
  try {
    const options = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ` + ENV_VARS.TMDB_API_TOKEN,
      },
    };
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.log("Error in fetchDataFromTMDB service ");
    throw new Error("Error while fetching data from TMDB " + error.message);
  }
};
