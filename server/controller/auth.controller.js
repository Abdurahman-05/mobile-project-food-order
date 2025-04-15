import bcrypt from "bcrypt";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const registerController = async (req, res) => {
  try {
    const { firstname, lastname, password, confirmPassword, email } = req.body;

    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: "Passwords do not match!" });
    // }

    const isFound = await User.findOne({ email });
    if (isFound) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashpwd = await bcrypt.hash(password.toString(), 10);
    const newuser = await User.create({
      firstname,
      lastname,
      email,
      password: hashpwd,
    });

    const accessToken = jwt.sign(
      {
        id: newuser._id, // Include user ID in JWT
        firstname: newuser.firstname,
        lastname: newuser.lastname,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5m" }
    );

    return res
      .status(201)
      .json({ accessToken, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const check_password = await bcrypt.compare(password, user.password);
    if (!check_password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id, // Include user ID in JWT
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5m" }
    );

    return res.json({ accessToken, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

const authController = {
  registerController,
  loginController,
};

export default authController;
