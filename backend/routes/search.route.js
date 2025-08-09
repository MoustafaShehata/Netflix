import express from "express";
import {
  addItemtoHistory,
  history,
  removeItemFromHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/person/:query", searchPerson);
router.get("/history", history);
router.delete("/history/remove/:id", removeItemFromHistory);
router.post("/history/add", addItemtoHistory);

export default router;
