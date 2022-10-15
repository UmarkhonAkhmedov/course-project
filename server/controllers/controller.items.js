import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

export const getAllItems = async (req, res) => {
  try {
    const result = await prisma.item.findMany();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  const { name, tags, authorEmail } = req.body;

  try {
    const result = await prisma.item.create({
      data: {
        name,
        tags,
        author: { connect: { email: authorEmail } },
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const likeItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await prisma.item.update({
      where: {
        id,
      },
      data: {
        viewContent: {
          increment: 1,
        },
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
