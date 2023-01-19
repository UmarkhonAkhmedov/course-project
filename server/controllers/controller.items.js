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

export const getAllItemsWithLike = async (req, res) => {
  try {
    const result = await prisma.item.findMany({
      include: {
        likes: {
          select: {
            count: true,
          },
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSearchItems = async (req, res) => {
  const { term } = req.query;

  try {
    const result = await prisma.item.findMany({
      where: {
        name: term,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  const { name, tags, img, collectionsId } = req.body;

  try {
    const result = await prisma.item.create({
      data: {
        name,
        tags,
        img,
        collectionsId,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.item.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      tags,
      collectionsId,
      integerField,
      stringField,
      multilineField,
      checkboxesField,
      dateField,
    } = req.body;

    const result = await prisma.item.update({
      data: {
        name,
        tags,
        collectionsId,
        integerField,
        stringField,
        multilineField,
        checkboxesField,
        dateField,
      },
      where: {
        id: id,
      },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
