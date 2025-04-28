import express from "express";
import authController from "../controllers/register.js";


const auth = express.Router();

auth.post("/signup", authController.registerController);
auth.post("/login", authController.loginController);



export default auth;
