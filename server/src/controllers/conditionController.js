import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getConditions = async (req, res) => {
  try {
    const conditions = await db.query("SELECT * FROM Condition");

    res.status(200).json(conditions.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
