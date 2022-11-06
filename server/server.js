// Importing dependencies
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Importing routes
import authRoutes from "./src/routes/authRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";

// Initializing .env
dotenv.config();

// Variables
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);

// Listening for requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
