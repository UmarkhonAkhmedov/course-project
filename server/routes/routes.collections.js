import express from "express";
import {
  createCollection,
  getAllCollections,
} from "../controllers/controller.collections.js";

const router = express.Router();

router.get("/", getAllCollections);
router.post("/create", createCollection);

export default router;
