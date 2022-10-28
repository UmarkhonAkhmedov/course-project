import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateAdminUser,
  updateStatusUser,
} from "../controllers/controller.users.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", getUser);
router.delete("/delete/:id", deleteUser);
router.patch("/status/:id", updateStatusUser);
router.patch("/admin/:id", updateAdminUser);

export default router;
