import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieToken from "../utils/CookieToken";

const router = express.Router();
const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    // cookieToken(result, res);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("This is errot");
    res.status(409).send({ message: "User with given email already Exist!" });
  }
};

export default router;
