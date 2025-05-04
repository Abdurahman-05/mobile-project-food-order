import express from "express";
import upload from "../config/multer.js";
import productcontroller from "../controllers/products.controller.js";
import authorizeRoles from "../middlewares/rolebaseMiddleware.js";
import authMiddleHandler from "../middlewares/authMiddleware.js";



const product = express.Router();

product.post("/products",authMiddleHandler,authorizeRoles("ADMIN"), upload.single('img'),productcontroller.createProduct);
product.get("/products",productcontroller.getAllProducts);
// product.delete("/products",productcontroller.deleteAllProducts);
product.delete("/products/:id",productcontroller.deleteProduct);



export default product;
