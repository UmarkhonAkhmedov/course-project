import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export const getAllComments = async (req, res) => {
  try {
    const result = await prisma.comment.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  const { text, itemId, authorEmail } = req.body;

  try {
    const result = await prisma.comment.create({
      data: {
        text,
        itemId,
        authorEmail,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export default router;
