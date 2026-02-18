import express from "express";
import {
  getTrendingTv,
  getTvByCategory,
  getTvDetails,
  getTvSimilar,
  getTvTrailers,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/details/:id", getTvDetails);
router.get("/trailers/:id", getTvTrailers);
router.get("/similar/:id", getTvSimilar);
router.get("/category/:category", getTvByCategory);

export default router;
