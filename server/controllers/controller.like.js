import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export const likeItemIncrement = async (req, res) => {
  const { id, authorEmail, itemId } = req.body;

  try {
    const result = await prisma.item.update({
      where: {
        id,
      },
      data: {
        count: {
          increment: 1,
        },
        authorEmail,
        itemId,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const likeItemDecrement = async (req, res) => {
  const { id, authorEmail, itemId } = req.body;

  try {
    const result = await prisma.item.update({
      where: {
        id,
      },
      data: {
        count: {
          decrement: 1,
        },
        authorEmail,
        itemId,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
