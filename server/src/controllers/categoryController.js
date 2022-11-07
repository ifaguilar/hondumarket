import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getCategories = async (req, res) => {
  try {
    const categories = await db.query("SELECT * FROM Category");

    res.status(200).json(categories.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
