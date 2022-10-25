import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  updateCollection,
} from "../controllers/controller.collections.js";

const router = express.Router();

router.get("/", getAllCollections);
router.post("/create", createCollection);
router.delete("/delete/:id", deleteCollection);
router.patch("/edit/:id", updateCollection);

export default router;
