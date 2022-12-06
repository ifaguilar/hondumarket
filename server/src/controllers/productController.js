import dotenv from "dotenv";
import db from "../database/db.js";
import cloudinary from "../utils/cloudinaryGenerator.js";

// Initializing .env
dotenv.config();

export const createProduct = async (req, res) => {
  try {
    const {
      userId,
      productName,
      description,
      price,
      category,
      condition,
      photos,
    } = req.body;

    const newProduct = await db.query(
      `INSERT INTO Product (
        product_name,
        product_description,
        price,
        person_id,
        category_id,
        condition_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [productName, description, price, userId, category, condition]
    );

    const newProductId = newProduct.rows[0].id;

    photos.forEach(async (photo) => {
      const response = await cloudinary.uploader.upload(photo, {
        upload_preset: "dev_setup",
      });

      const photoURL = response.secure_url.replace(".webp", ".png");

      await db.query(
        `INSERT INTO Photo (
          photo,
          product_id
        ) VALUES ($1, $2)`,
        [photoURL, newProductId]
      );
    });

    res.status(200).json({
      success: true,
      newProductId: newProductId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

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
        Category.category_name,
        Condition.condition_name,
        Photo.photo,
        Person_Address.municipality_id,
        Municipality.municipality_name,
        Municipality.department_id,
        Department.department_name
      FROM Product
      JOIN Category ON Category.id = Product.category_id
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
      AND Category.is_active = TRUE
      ORDER BY Product.created_at DESC, Product.id DESC`
    );

    res.status(200).json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProductsDashboard = async (req, res) => {
  try {
    const products = await db.query(
      `
      SELECT
        Product.*,
        Category.category_name,
        Condition.condition_name,
        Photo.photo,
        Person_Address.municipality_id,
        Municipality.municipality_name,
        Municipality.department_id,
        Department.department_name
      FROM Product
      JOIN Category ON Category.id = Product.category_id
      JOIN Condition ON Condition.id = Product.condition_id
      JOIN Photo ON Photo.product_id = Product.id
      JOIN Person_Address ON Person_Address.person_id = Product.person_id
      JOIN Municipality ON Municipality.id = Person_Address.municipality_id
      JOIN Department ON Department.id = Municipality.department_id
      WHERE Photo.id = (
        SELECT MIN(Photo.id)
        FROM Photo
        WHERE Photo.product_id = Product.id
      )
      ORDER BY Product.id`
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

    await db.query("UPDATE Product SET views = views + 1 WHERE id = $1", [
      req.params.id,
    ]);

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

export const updateProduct = async (req, res) => {
  try {
    const { productId, expirationDate, isActive } = req.body;

    const datetime = expirationDate.split("T");
    const date = datetime[0];
    const time = datetime[1];
    const newExpirationDate = `${date} ${time}`;

    await db.query(
      "UPDATE Product SET expiration_date = TO_TIMESTAMP($1, 'YYYY-MM-DD HH24:MI:SS'), modified_at = NOW(), is_active = $2 WHERE id = $3",
      [newExpirationDate, isActive, productId]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deactivateProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    await db.query("UPDATE Product SET is_active = FALSE, modified_at = NOW() WHERE id = $1", [
      productId,
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addView = async (req, res) => {
  try {
    await db.query("UPDATE Product SET views = views + 1 WHERE id = $1", [
      req.params.id,
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
