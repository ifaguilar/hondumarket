import pool from "../database/db.js";

export const getCategories = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM Category");

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  res.json({ message: "Create category" });
};

export const getCategory = async (req, res) => {
  res.json({ message: `Get category ${req.params.id}` });
};

export const updateCategory = async (req, res) => {
  res.json({ message: `Update category ${req.params.id}` });
};

export const deleteCategory = async (req, res) => {
  res.json({ message: `Delete category ${req.params.id}` });
};
