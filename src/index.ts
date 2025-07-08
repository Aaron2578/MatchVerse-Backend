import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import appRouter from "@/routers";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(appRouter);

if (!process.env.MONGODB_URI) throw new Error("Provide db url in env");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Db connected");
  app.listen(8, () => {
    console.log("Server is listening in port 8");
  });
});
