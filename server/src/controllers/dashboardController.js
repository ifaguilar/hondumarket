import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const countUsers = async (req, res) => {
  try {
    const counter = await db.query("SELECT COUNT(*) FROM Person");

    let numberOfUsers = "0";

    if (parseInt(counter.rows[0].count) !== 0) {
      numberOfUsers = counter.rows[0].count;
    }

    res.status(200).json({
      success: true,
      numberOfUsers: numberOfUsers,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const countProducts = async (req, res) => {
  try {
    const counter = await db.query("SELECT COUNT(*) FROM Product");

    let numberOfProducts = "0";

    if (parseInt(counter.rows[0].count) !== 0) {
      numberOfProducts = counter.rows[0].count;
    }

    res.status(200).json({
      success: true,
      numberOfProducts: numberOfProducts,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const countCategories = async (req, res) => {
  try {
    const counter = await db.query("SELECT COUNT(*) FROM Category");

    let numberOfCategories = "0";

    if (parseInt(counter.rows[0].count) !== 0) {
      numberOfCategories = counter.rows[0].count;
    }

    res.status(200).json({
      success: true,
      numberOfCategories: numberOfCategories,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const countComplaints = async (req, res) => {
  try {
    const counter = await db.query("SELECT COUNT(*) FROM Complaints");

    let numberOfComplaints = "0";

    if (parseInt(counter.rows[0].count) !== 0) {
      numberOfComplaints = counter.rows[0].count;
    }

    res.status(200).json({
      success: true,
      numberOfComplaints: numberOfComplaints,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const productsByCategory = await db.query(
      `SELECT
        row_number() OVER() AS "index",
        Category.category_name,
        COUNT(Product.*) AS "products"
      FROM Product
      JOIN Category ON Category.id = Product.category_id
      GROUP BY Category.category_name, Category.id
      ORDER BY Category.id`
    );

    res.status(200).json(productsByCategory.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCondition = async (req, res) => {
  try {
    const productsByCondition = await db.query(
      `SELECT
        row_number() OVER() AS "index",
        Condition.condition_name,
        COUNT(Product.*) AS "products"
      FROM Product
      JOIN Condition ON Condition.id = Product.condition_id
      GROUP BY Condition.condition_name, Condition.id
      ORDER BY Condition.id`
    );

    res.status(200).json(productsByCondition.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUsersByDepartment = async (req, res) => {
  try {
    const usersByDepartment = await db.query(
      `SELECT
        row_number() OVER() AS "index",
        Department.department_name,
        COUNT(Person.*) AS "users"
      FROM Person
      JOIN Person_Address ON Person_Address.person_id = Person.id
      JOIN municipality ON municipality.id = Person_Address.municipality_id
      JOIN department ON department.id = municipality.department_id
      GROUP BY Department.department_name`
    );

    res.status(200).json(usersByDepartment.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUsersByMonth = async (req, res) => {
  try {
    const usersByMonth = await db.query(
      `SELECT
        row_number() OVER() AS "index",
        EXTRACT(MONTH FROM created_at) AS "month",
        COUNT(*) AS "users"
      FROM Person
      GROUP BY month, created_at
      ORDER BY created_at`
    );

    usersByMonth.rows.forEach((row) => {
      const date = new Date();
      date.setMonth(parseInt(row.month) - 1);

      row.month = new Intl.DateTimeFormat("es-HN", { month: "long" }).format(
        date
      );

      row.month = row.month.charAt(0).toUpperCase() + row.month.slice(1);
    });

    res.status(200).json(usersByMonth.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
