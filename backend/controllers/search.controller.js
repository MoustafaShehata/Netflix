import { fetchDataFromTMDB } from "../services/tmdb.sevice.js";
import { User } from "../models/user.model.js";

// searchMovie
export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// searchTv
export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length == 0) {
      return res.status(404).send(null);
    }
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchTv controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// searchPerson
export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchDataFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// history
export const history = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in history controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// removeItemFromHistory;
export const removeItemFromHistory = async (req, res) => {
  let { id } = req.params;
  id = +id;
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id,
        },
      },
    });
    res.status(200).json({ success: true, message: "removed successfully" });
  } catch (error) {
    console.log("Error in removeItemFromHistory controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// addItemtoHistory
export const addItemtoHistory = async (req, res) => {
  try {
    const { id, title, image, type } = req.body;
    if (!req.user.searchHistory.some((item) => item.id == id)) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: id,
            title: title,
            image: image,
            type: type,
            createdAt: new Date(),
          },
        },
      });
    }
    res.status(200).json({ success: true, message: "Add to history" });
  } catch (error) {
    console.log("Error in addItemtoHistory controller " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
