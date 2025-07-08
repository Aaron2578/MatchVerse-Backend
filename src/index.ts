import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import appRouter from "./routers"; // Adjust if using alias

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(appRouter);

if (!process.env.MONGODB_URI) throw new Error("Provide db url in env");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Db connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
