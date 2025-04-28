import express from "express"; // Import types
import prisma from "./prisma/client.js";
import auth from "./routers/auth.js";
import authMiddleHandler from "./middlewares/authMiddleware.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/signup", async (req, res) => {
  const userlist = await prisma.user.findMany();
  res.status(200).json({ userlist });
});

app.use("/", auth);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
