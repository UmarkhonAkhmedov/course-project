import express from "express";
import { createUser, getAllUsers } from "../controllers/controller.users.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);

export default router;
