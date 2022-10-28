import express from "express";
import { PrismaClient } from "@prisma/client";
import getJwtToken from "../utils/jwt";
import bcrypt from "bcrypt";

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
  try {
    const { name, email, password, status, admin } = req.body;
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT__NUMBER));
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await prisma.user.create({
      data: {
        email,
        name,
        status,
        admin,
        password: hashPassword,
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

    const validPassword = await bcrypt.compare(
      req.body.password,
      result.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (result.status === false) {
      return res.status(401).send({ message: "Your Account is Blocked" });
    }

    const token = getJwtToken(result.id);

    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    console.log("This is error");
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatusUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await prisma.user.update({
      data: {
        status,
      },
      where: {
        id: id,
      },
    });
    res.json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error);
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { admin } = req.body;

    const result = await prisma.user.update({
      data: {
        admin,
      },
      where: {
        id: id,
      },
    });
    res.json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error);
  }
};

export default router;
