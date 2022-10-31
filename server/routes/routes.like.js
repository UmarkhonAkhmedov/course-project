import express from "express";
import {
  likeItemDecrement,
  likeItemIncrement,
} from "../controllers/controller.like.js";

const router = express.Router();

router.post("/add", likeItemIncrement);
router.post("/remove", likeItemDecrement);

export default router;
