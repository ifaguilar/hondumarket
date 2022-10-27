import pool from "../database/db.js";

export const getProducts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM Product");

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  res.json({ message: "Create product" });
};

export const getProduct = async (req, res) => {
  res.json({ message: `Get product ${req.params.id}` });
};

export const updateProduct = async (req, res) => {
  res.json({ message: `Update product ${req.params.id}` });
};

export const deleteProduct = async (req, res) => {
  res.json({ message: `Delete product ${req.params.id}` });
};
