import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
} from "../controllers/controller.collections.js";

const router = express.Router();

router.get("/", getAllCollections);
router.post("/create", createCollection);
router.delete("/delete/:id", deleteCollection);

export default router;
