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

export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await db.query(
      `
      SELECT
        Product.id,
        Product.product_name,
        TO_CHAR(Product.price, 'fm999G999D99') AS price,
        Photo.photo,
        Category.category_name
      FROM Product
      JOIN Category ON Product.category_id = Category.id
      JOIN Photo ON Photo.product_id = Product.id
      WHERE Photo.id = (
        SELECT MIN(Photo.id)
        FROM Photo
        WHERE Photo.product_id = Product.id
      )
      AND Product.category_id = $1
      ORDER BY Product.created_at, Product.id DESC
      LIMIT 10
      `,
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      topProducts: topProducts.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
