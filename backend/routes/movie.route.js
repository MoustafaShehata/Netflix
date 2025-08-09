import express from "express";
import {
  getMovieTrending,
  getMovieTrailers,
  getMovieDetails,
  getMovieSimilar,
  getMovieByCategory,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getMovieTrending);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getMovieSimilar);
router.get("/category/:category", getMovieByCategory);

export default router;
