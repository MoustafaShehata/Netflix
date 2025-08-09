import express from "express";
import {
  getTVTrending,
  getTVTrailers,
  getTVDetails,
  getTVSimilar,
  getTVByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTVTrending);
router.get("/:id/trailers", getTVTrailers);
router.get("/:id/details", getTVDetails);
router.get("/:id/similar", getTVSimilar);
router.get("/category/:category", getTVByCategory);

export default router;
