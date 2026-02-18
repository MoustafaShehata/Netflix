import { fetchDataFromTMDB } from "../services/tmdb.service.js";

// getTrendingTv
export const getTrendingTv = async (req, res) => {
  try {
    const response = await fetchDataFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US'",
    );

    const randomTv =
      response.results[Math.floor(Math.random() * response.results.length)];

    res.status(200).json({ success: true, content: randomTv });
  } catch (error) {
    console.log("Error in getTrendingTv controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getTvTrailers
export const getTvTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "tv Trailers not found" });
    }
    console.log("Error in getTvTrailers controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getTvDetails
export const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    );

    res.status(200).json({ success: true, content: response });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "tv details not found" });
    }
    console.log("Error in getTvDetails controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getTvSimilar
export const getTvSimilar = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`,
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "similar tv not found" });
    }
    console.log("Error in getTvSimilar controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getTvByCategory
export const getTvByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in getTvByCategory controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
