import express from "express";
import authController from "../controllers/auth.controller.js";


const auth = express.Router();

auth.post("/auth/signup", authController.registerController);
auth.post("/auth/login", authController.loginController);
// auth.post("api/auth/logout", authController.logoutController);



export default auth;
