import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export const createLikeItem = async (req, res) => {
  const { authorEmail, itemId } = req.body;

  try {
    const result = await prisma.like.create({
      data: {
        count: 1,
        authorEmail,
        itemId,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const getAllLikes = async (req, res) => {
  try {
    const result = await prisma.like.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likeItemIncrement = async (req, res) => {
  const { id, authorEmail, itemId } = req.body;

  try {
    const result = await prisma.like.update({
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

export const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.like.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
  }
};
export const likeItemDecrement = async (req, res) => {
  const { id, authorEmail, itemId } = req.body;

  try {
    const result = await prisma.like.update({
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
