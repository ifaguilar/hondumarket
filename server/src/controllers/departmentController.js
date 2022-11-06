import dotenv from "dotenv";
import db from "../database/db.js";

dotenv.config();

export const getDepartments = async (req, res) => {
  try {
    const departments = await db.query("SELECT * FROM Department");

    res.status(200).json(departments.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMunicipalities = async (req, res) => {
  try {
    const municipalities = await db.query(
      "SELECT * FROM Municipality WHERE department_id = $1",
      [req.params.id]
    );

    res.status(200).json(municipalities.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
