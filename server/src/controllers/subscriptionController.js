import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getSubscriptions = async (req, res) => {
  try {
    const userSubscriptions = await db.query(
      "SELECT * FROM Subscription WHERE person_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      success: true,
      subscriptions: userSubscriptions.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const subscribeToCategory = async (req, res) => {
  try {
    const { userId, categoryId } = req.body;

    const newSubscription = await db.query(
      "INSERT INTO Subscription (person_id, category_id) VALUES ($1, $2)",
      [userId, categoryId]
    );

    const userSubscriptions = await db.query(
      "SELECT * FROM Subscription WHERE person_id = $1",
      [userId]
    );

    res.status(200).json({
      success: true,
      subscriptions: userSubscriptions.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const unsubscribeFromCategory = async (req, res) => {
  try {
    const { userId, categoryId } = req.body;

    await db.query(
      "DELETE FROM Subscription WHERE person_id = $1 AND category_id = $2",
      [userId, categoryId]
    );

    const userSubscriptions = await db.query(
      "SELECT * FROM Subscription WHERE person_id = $1",
      [userId]
    );

    res.status(200).json({
      success: true,
      subscriptions: userSubscriptions.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
