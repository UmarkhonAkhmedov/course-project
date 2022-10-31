import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getSearchItems,
  updateItem,
} from "../controllers/controller.items.js";

const router = express.Router();

router.get("/", getAllItems);
router.post("/create", createItem);
router.delete("/delete/:id", deleteItem);
router.patch("/update/:id", updateItem);
router.get("/search", getSearchItems);

export default router;
