import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  likeItem,
  updateItem,
} from "../controllers/controller.items.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/create", createItem);
router.put("/:id/views", likeItem);
router.delete("/delete/:id", deleteItem);
router.patch("/update/:id", updateItem);

export default router;
