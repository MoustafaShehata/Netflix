import express from "express";
import {
  getMovieByCategory,
  getMovieDetails,
  getMovieSimilar,
  getMovieTrailers,
  getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/details/:id", getMovieDetails);
router.get("/trailers/:id", getMovieTrailers);
router.get("/similar/:id", getMovieSimilar);
router.get("/category/:category", getMovieByCategory);
export default router;
