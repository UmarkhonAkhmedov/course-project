import express from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/controller.comments.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/create", createComment);

export default router;
