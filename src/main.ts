import "reflect-metadata";
import express from "express";
require('dotenv').config()

import connection from "./database/database";
import { authRoutes, userRoutes } from "./api/routes";
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(authRoutes);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(process.env.PORT || 3333, () => {
      console.log("Server started on port 3333");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();