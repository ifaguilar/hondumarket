import dotenv from "dotenv";
import db from "../database/db.js";

// Initializing .env
dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const users = await db.query(
      "SELECT id, first_name, last_name, email FROM Person WHERE is_active = TRUE"
    );

    res.status(200).json({
      success: true,
      users: users.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

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
      AND Product.is_active = TRUE
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

//==== Controladores para el manejo del rating y quejas ====
export const getAverageUserRating = async (req, res) => {
	try {
		const userRating = await db.query(
			// Query para obtener el promedio de calificacion del usuario
			`
				SELECT 
					AVG(rating.rating_value) rate_average,
					COUNT(rating.id) AS reviews_amount
				FROM rating
				INNER JOIN person_rating ON rating.id = person_rating.rating_id
				INNER JOIN PERSON ON PERSON_RATING.PERSON_ID = PERSON.ID
				WHERE PERSON_RATING.PERSON_ID = $1
      		`,
			[req.params.id]
		);

		res.status(200).json(userRating.rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
};

export const addUserRating = async (req, res) => {

	try {

		const { userId, sellersId, description, rateNumber } = req.body;

		const isAdded = await db.query(`
			SELECT * FROM person_rating WHERE person_id= $1 AND reviewer_id =$2;
		`, [sellersId, userId]);
		
		if (isAdded.rowCount) {
			return res.status(400).json({
				ok:true,
				isAdded: false,
				isAlreadyExists: true
			})
		}

		const resDB = await db.query(
			`INSERT INTO 
				person_rating (person_id, reviewer_id, rating_id, description) 
				VALUES ($1, $2, $3, $4)`,
			[sellersId, userId, rateNumber, description]
		);

		if (resDB.rowCount == 0)
			throw new Error("Ocurrio un error, no se pudo insertar el rating");

		res.status(200).json({
			ok: true,
			isAdded: true
		});

	} catch (error) {

		console.error(error.message);
		res.status(500).json({
			ok: false,
			isAdded: false,
			isError: true,
			error: {
				message: error.message,
			},
		});
	}
};

export const addUserComplaint = async (req, res) => {

	try {

		const { userId, sellersId, description } = req.body;

		const isAdded = await db.query(`
			SELECT * FROM complaints WHERE person_id= $1 AND reviewer_id =$2;
		`, [sellersId, userId]);
		
		if (isAdded.rowCount) {
			return res.status(400).json({
				ok:true,
				isAdded: false,
				isAlreadyExists: true
			})
		}

		const resDB = await db.query(
			`INSERT INTO 
				complaints (person_id, reviewer_id, description) 
				VALUES ($1, $2, $3)`,
			[sellersId, userId, description]
		);

		if (resDB.rowCount == 0)
			throw new Error("No se pudo insertar la queja");

		res.status(200).json({
			ok: true,
			isAdded: true
		});

	} catch (error) {

		console.error(error.message);
		res.status(500).json({
			ok: false,
			isAdded: false,
			isError: true,
			error: {
				message: error.message,
			},
		});
	}
};