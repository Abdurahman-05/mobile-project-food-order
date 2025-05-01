import express from "express"; // Import types
import prisma from "./prisma/client.js";
import auth from "./routers/auth.js";
import authMiddleHandler from "./middlewares/authMiddleware.js";
import cors from "cors";
import upload from "./config/multer.js";
import fs from "fs"
import { fileURLToPath } from "url";
import path from 'path'
import product from "./routers/product.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());

app.get("/signup", async (req, res) => {
  const userlist = await prisma.user.findMany();
  res.status(200).json({ userlist });
});

app.use("/", auth);
app.use('/',product)

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
