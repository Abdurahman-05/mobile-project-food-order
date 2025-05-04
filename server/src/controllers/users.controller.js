import express from "express";
import prisma from "../prisma/client.js";
import { applyActionCode } from "firebase/auth/web-extension";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const getProfile = async (req, res, next) => {
  try {
    const myProfile = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (!myProfile) next(new AppError("User already doesn't exist", 400));
    res.status(200).json({ message: "hear is your profile", myProfile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const oldUser = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!oldUser) {
      return next(new AppError("User not found", 404));
    }
    if (email) {
      const duplicatedUser = await prisma.user.findUnique({
        where: { email },
      });

      if (duplicatedUser && duplicatedUser.id !== req.user.id) {
        return next(
          new AppError("Email is already taken by another user", 400)
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        username: username,
        password: hashedPassword,
        email: email,
      },
    });

    const accessToken = jwt.sign(
      {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
      process.env.ACCESS_TOKEN
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      accessToken,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const getProfileById = (req, res, next) => {};

const userController = {
  getProfile,
  updateProfile,
};

export default userController;
