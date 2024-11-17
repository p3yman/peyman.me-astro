// src/app.ts
import express from "express";

import postRoutes from "./routes/posts";

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Route for handling posts
app.use("/posts", postRoutes);

export default app;
