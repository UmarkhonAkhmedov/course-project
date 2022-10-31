import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export const getAllCollections = async (req, res) => {
  try {
    const result = await prisma.collection.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  const { name, description, topic, authorEmail, img } = req.body;
  try {
    const result = await prisma.collection.create({
      data: {
        name,
        description,
        topic,
        authorEmail,
        img,
      },
    });

    res.status(201).send({ message: "Collection created successfully" });
  } catch (error) {
    res.status(409).send({ message: "This collection of Name already Exist!" });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.collection.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, topic, authorEmail } = req.body;

    const result = await prisma.collection.update({
      data: {
        name,
        description,
        topic,
      },
      where: {
        id: id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};

export default router;
