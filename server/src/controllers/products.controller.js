import express from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";

const app = express();
const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    if (!products || products.length === 0)
      return res.status(404).json({ message: "No products found" });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "something error happend" });
  }
};

const createProduct = async (req, res, next) => {
  const ingredients = JSON.parse(req.body.ingredients);
  try {
    if (!req.file)
      return res.status(400).json({ message: "No logo image uploaded" });
    if (!req.file.mimetype.startsWith("image/"))
      return res.status(400).json({ message: "Uploaded file is not an image" });

    const resizedBuffer = await sharp(req.file.buffer).toBuffer();

    // // // Define file path'
    const cleanFileName = req.file.originalname.replace(/\s+/g, "-");
    let filename = cleanFileName.split(".")[0];
    filename = `${filename}-${Date.now()}.jpeg`;
    const uploadDir = path.join(__dirname, "../uploads");
    const filePath = path.join(uploadDir, filename);

    // // // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // // // Save the processed image
    await fs.promises.writeFile(filePath, resizedBuffer);

    // // Create job entry in database
    const product = await prisma.product.create({
      data: {
        ...req.body,
        ingredients: ingredients,
        price: parseFloat(req.body.price),
        img: `/uploads/${filename}`,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: "Failed to create job" });
  }
};

const deletProduct = async () => {};

const deleteAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.deleteMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ error: "something error happend" });
  }
};

const productHandler = {
  createProduct,
  getAllProducts,
  deleteAllProducts,
};
export default productHandler;
