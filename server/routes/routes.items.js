import express from "express";
import {
  createItem,
  getAllItems,
  likeItem,
} from "../controllers/controller.items.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/create", createItem);
router.put("/:id/views", likeItem);

export default router;
