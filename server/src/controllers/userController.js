import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getProducts = async (req, res) => {
  try {
    const userProducts = await db.query(
      `SELECT
          Product.id,
          Product.product_name,
          Product.price,
          Photo.photo
      FROM Product
      JOIN Photo ON Photo.product_id = Product.id
      WHERE Photo.id = (
        SELECT MIN(Photo.id)
        FROM Photo
        WHERE Photo.product_id = Product.id
      )
      AND Product.person_id = $1
      ORDER BY Product.created_at`,
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      userProducts: userProducts.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userWishlist = await db.query(
      "SELECT * FROM Wishlist WHERE person_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      wishlist: userWishlist.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getWishlistProducts = async (req, res) => {
  try {
    const wishlistProducts = await db.query(
      `
      SELECT
        Product.id,
        Product.product_name,
        Product.price,
        Photo.photo
      FROM Wishlist
      JOIN Product ON Product.id = Wishlist.product_id
      JOIN Photo ON Photo.product_id = Product.id
      WHERE Photo.id = (
        SELECT MIN(Photo.id)
        FROM Photo
        WHERE Photo.product_id = Product.id
      )
      AND Wishlist.person_id = $1
      ORDER BY Wishlist.created_at
      `,
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      wishlistProducts: wishlistProducts.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await db.query(
      "INSERT INTO Wishlist (person_id, product_id) VALUES ($1, $2)",
      [userId, productId]
    );

    const userWishlist = await db.query(
      "SELECT * FROM Wishlist WHERE person_id = $1",
      [userId]
    );

    res.status(200).json({
      success: true,
      wishlist: userWishlist.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await db.query(
      "DELETE FROM Wishlist WHERE person_id = $1 AND product_id = $2",
      [userId, productId]
    );

    const userWishlist = await db.query(
      "SELECT * FROM Wishlist WHERE person_id = $1",
      [userId]
    );

    res.status(200).json({
      success: true,
      wishlist: userWishlist.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
