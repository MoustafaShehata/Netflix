import { fetchDataFromTMDB } from "../services/tmdb.service.js";

// getTrendingMovie
export const getTrendingMovie = async (req, res) => {
  try {
    const response = await fetchDataFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US'",
    );

    const randomMovie =
      response.results[Math.floor(Math.random() * response.results.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.log("Error in getTrendingMovie controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getMovieTrailers
export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "movie Trailers not found" });
    }
    console.log("Error in getMovieTrailers controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getMovieDetails
export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    );

    res.status(200).json({ success: true, content: response });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "movie details not found" });
    }
    console.log("Error in getMovieDetails controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getMovieSimilar
export const getMovieSimilar = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res
        .status(404)
        .json({ success: false, message: "similar movies not found" });
    }
    console.log("Error in getMovieSimilar controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getMovieByCategory
export const getMovieByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in getMovieByCategory controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
