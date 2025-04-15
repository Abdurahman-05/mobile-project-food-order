import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () =>{
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log({ "message": error.message });
  }
}

export default connectDB;
