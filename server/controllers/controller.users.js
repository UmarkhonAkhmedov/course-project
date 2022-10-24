import express from "express";
import { PrismaClient } from "@prisma/client";
import getJwtToken from "../utils/jwt";

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

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(409).send({ message: "User with given email already Exist!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!result)
      return res.status(401).send({ message: "Invalid Email or Password" });

    let validPassword = false;
    if (req.body.password === result.password) {
      validPassword = true;
    }

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = getJwtToken(result.id);

    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    console.log("This is error");
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export default router;
