import express from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const registerController = async (req, res) => {
  const { username, email, password} =
    req.body;
  // console.log(req.body);

  const duplicateUser = await prisma.user.findUnique({ where: { email } });
  if (duplicateUser) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const accessToken = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.ACCESS_TOKEN
    );

    return res
      .status(201)
      .json({ accessToken, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "User are not registerd!!!" });
  }

  try {
    const check_password = await bcrypt.compare(password, user.password);
    if (!check_password) {
      return res.status(400).json({
        error: "incorrect password!!!!!!",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.ACCESS_TOKEN
    );

    return res.json({ accessToken, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }
};
const logoutController = async (req,res)=>{
}

const authController = {
  registerController,
  loginController,
  logoutController
};

export default authController;
