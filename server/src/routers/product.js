import express from "express";
import upload from "../config/multer.js";
import productHandler from "../controllers/product.controller.js";



const product = express.Router();

product.post("/api/product", upload.single('img'),productHandler.createProduct);
product.get("/api/products",productHandler.getAllProducts);
product.get("/products",productHandler.deleteAllProducts);



export default product;
