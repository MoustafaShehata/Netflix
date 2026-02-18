import { User } from "../models/user.model.js";
import { fetchDataFromTMDB } from "../services/tmdb.service.js";

// getMovieSearchResults
export const getMovieSearchResults = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in getMovieSearchResults controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getTvSearchResults
export const getTvSearchResults = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in getTvSearchResults controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getPersonSearchResults
export const getPersonSearchResults = async (req, res) => {
  try {
    const { query } = req.params;

    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in getPersonSearchResults controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getHistoryData
export const getHistoryData = async (req, res) => {
  try {
    const user = await User.findOne(req.user);
    res.status(200).json({ success: true, content: user.searchHistory });
  } catch (error) {
    console.log("Error in getHistoryData controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// addItemToHistory
export const addMovieToHistory = async (req, res) => {
  try {
    const { id, img, title, type } = req.body;

    const exist = req.user.searchHistory.some((item) => item.id === id);

    if (!req.user.searchHistory.some((item) => item.id === id)) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id,
            img,
            title,
            type,
            createdAt: new Date(),
          },
        },
      });
    }

    res
      .status(200)
      .json({ success: true, message: "saved successfully in history" });
  } catch (error) {
    console.log("Error in addMovieToHistory controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// removeMovieFromHistory
export const removeMovieFromHistory = async (req, res) => {
  try {
    let { id } = req.params;
    id = +id;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id,
        },
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Deleted successfully",
        content: req.user.searchHistory,
      });
  } catch (error) {
    console.log("Error in removeMovieFromHistory controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
