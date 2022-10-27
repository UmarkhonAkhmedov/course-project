import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  likeItem,
} from "../controllers/controller.items.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/create", createItem);
router.put("/:id/views", likeItem);
router.delete("/delete/:id", deleteItem);

export default router;
