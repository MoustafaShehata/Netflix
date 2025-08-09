import { fetchDataFromTMDB } from "../services/tmdb.sevice.js";

// getTrending => for movie and tv
export const getMovieTrending = async (req, res) => {
  // const { type } = req.params;

  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
    );

    // random => for movie and tv
    const random =
      response.results[Math.floor(Math.random() * response.results.length)];

    res.status(200).json({ success: true, content: random });
  } catch (error) {
    console.log("Error in getTrending controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getTrailers => for movie and tv
export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: `No trailers found ` });
    }

    console.log("Error in getTrailers controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getDetails => for movie and tv
export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: response });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: `No details found ` });
    }

    console.log("Error in getDetails controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getSimilar => for movie and tv
export const getMovieSimilar = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).json({ message: `No similar found ` });
    }

    console.log("Error in getSimilar controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getByCategory => for movie and tv
export const getMovieByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in getByCategory controllers " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
