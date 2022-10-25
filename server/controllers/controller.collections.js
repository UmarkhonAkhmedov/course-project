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
  const { name, description, topic, authorEmail } = req.body;
  try {
    const result = await prisma.collection.create({
      data: {
        name,
        description,
        topic,
        authorEmail,
      },
    });

    res.status(201).send({ message: "Collection created successfully" });
  } catch (error) {
    res.status(409).send({ message: "This collection of Name already Exist!" });
  }
};

export default router;