import db from "../database/db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Person");

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO Person (first_name, last_name, phone, email, psswrd, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *",
      [firstName, lastName, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM Person WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const result = await db.query(
      "UPDATE Person SET first_name = $1, last_name = $2, phone = $3, email = $4, psswrd = $5 WHERE id = $4 RETURNING *",
      [firstName, lastName, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM Person WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
