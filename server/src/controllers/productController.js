import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getProducts = async (req, res) => {
  try {
    const products = await db.query(
      `
      SELECT
        Product.id,
        Product.product_name,
        Product.price,
        Product.created_at,
        Product.category_id,
        Condition.condition_name,
        Photo.photo,
        Person_Address.municipality_id,
        Municipality.municipality_name,
        Municipality.department_id,
        Department.department_name
      FROM Product
      JOIN Condition ON Condition.id = Product.condition_id
      JOIN Photo ON Photo.product_id = Product.id
      JOIN Person_Address ON Person_Address.person_id = Product.person_id
      JOIN Municipality ON Municipality.id = Person_Address.municipality_id
      JOIN Department ON Department.id = Municipality.department_id
      WHERE Photo.id = (
        SELECT MIN(Photo.id)
        FROM Photo
        WHERE Photo.product_id = Product.id
      ) AND Product.is_active = TRUE
      ORDER BY Product.created_at, Product.id DESC`
    );

    res.status(200).json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await db.query(
      `
      SELECT
        Product.*,
        Category.category_name,
        Condition.condition_name,
        Person_Address.municipality_id,
        Municipality.municipality_name,
        Municipality.department_id,
        Department.department_name
      FROM Product
      JOIN Category ON Category.id = Product.category_id
      JOIN Condition ON Condition.id = Product.condition_id
      JOIN Person_Address ON Person_Address.person_id = Product.person_id
      JOIN Municipality ON Municipality.id = Person_Address.municipality_id
      JOIN Department ON Department.id = Municipality.department_id
      WHERE Product.id = $1
    `,
      [req.params.id]
    );

    res.status(200).json(product.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getPhotos = async (req, res) => {
  try {
    const photos = await db.query(
      `
      SELECT Photo.*
      FROM Photo
      JOIN Product ON Photo.product_id = Product.id
      WHERE Photo.product_id = $1
    `,
      [req.params.id]
    );

    res.status(200).json(photos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getSeller = async (req, res) => {
  try {
    const seller = await db.query(
      `
      SELECT Person.*
      FROM Product
      JOIN Person ON Product.person_id = Person.id
      WHERE Product.id = $1
    `,
      [req.params.id]
    );

    res.status(200).json(seller.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deactivateProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    await db.query("UPDATE Product SET is_active = FALSE WHERE id = $1", [
      productId,
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
