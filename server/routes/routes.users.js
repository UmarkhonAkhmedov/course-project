import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/controller.users.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", getUser);

export default router;
