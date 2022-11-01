import express from "express";
import {
  getAllLikes,
  deleteLike,
  likeItemIncrement,
  createLikeItem,
} from "../controllers/controller.like.js";

const router = express.Router();

router.patch("/add", likeItemIncrement);
router.delete("/remove/:id", deleteLike);
router.post("/create", createLikeItem);
router.get("/", getAllLikes);

export default router;
