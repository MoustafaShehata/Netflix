import express from "express";
import {
  addMovieToHistory,
  getHistoryData,
  getMovieSearchResults,
  getPersonSearchResults,
  getTvSearchResults,
  removeMovieFromHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", getMovieSearchResults);
router.get("/tv/:query", getTvSearchResults);
router.get("/person/:query", getPersonSearchResults);
router.get("/history", getHistoryData);
router.post("/history/add", addMovieToHistory);
router.delete("/history/remove/:id", removeMovieFromHistory);

export default router;
