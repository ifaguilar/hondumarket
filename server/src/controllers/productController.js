import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getProducts = async (req, res) => {
  try {
    const products = await db.query(
      "SELECT DISTINCT ON (Product.id) Product.*, Photo.photo FROM Product JOIN Photo ON Product.id = Photo.product_id ORDER BY Product.id"
    );

    res.status(200).json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
