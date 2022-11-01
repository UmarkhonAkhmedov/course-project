import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getAllCollectionsWithItems,
  updateCollection,
} from "../controllers/controller.collections.js";

const router = express.Router();

router.get("/", getAllCollections);
router.post("/create", createCollection);
router.delete("/delete/:id", deleteCollection);
router.patch("/edit/:id", updateCollection);
router.get("/withItems", getAllCollectionsWithItems);

export default router;
