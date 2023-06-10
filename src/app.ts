import "reflect-metadata";
import express from "express";
import cors from "cors";
import {
  authRoutes,
  exerciseRoutes,
  groupRoutes,
  recordRoutes,
  userRoutes,
} from "./api/routes";

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);
app.use(exerciseRoutes);
app.use(recordRoutes);
app.use(groupRoutes);

export default app;
