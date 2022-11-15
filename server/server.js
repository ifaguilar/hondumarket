// Importing dependencies
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Importing routes
import authRoutes from "./src/routes/authRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

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
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Listening for requests
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
