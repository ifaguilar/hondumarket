import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../database/db.js";
import { DEFAULT_AVATAR_URL } from "../utils/cloudinary.js";
import jwtGenerator from "../utils/jwtGenerator.js";

dotenv.config();

export const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, municipalityId } =
      req.body;
    const avatar = DEFAULT_AVATAR_URL;

    let user = await db.query("SELECT * FROM Person WHERE email = $1", [email]);

    if (user.rowCount !== 0) {
      console.error("El correo introducido ya está en uso.");
      return res
        .status(401)
        .json({ message: "El correo introducido ya está en uso." });
    }

    user = await db.query("SELECT * FROM Person WHERE phone = $1", [phone]);

    if (user.rowCount !== 0) {
      console.error("El número telefónico introducido ya está en uso.");
      return res
        .status(401)
        .json({ message: "El número telefónico introducido ya está en uso." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      "INSERT INTO Person (first_name, last_name, phone, email, psswrd, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, phone, email, avatar, role_id",
      [firstName, lastName, phone, email, hashedPassword, avatar]
    );

    const newUserAddress = await db.query(
      "INSERT INTO Person_Address (person_id, municipality_id) VALUES ($1, $2)",
      [newUser.rows[0].id, municipalityId]
    );

    const newToken = jwtGenerator(newUser.rows[0].id);

    res.status(200).json({
      id: newUser.rows[0].id,
      firstName: newUser.rows[0].first_name,
      lastName: newUser.rows[0].last_name,
      phone: newUser.rows[0].phone,
      email: newUser.rows[0].email,
      avatar: newUser.rows[0].avatar,
      roleId: newUser.rows[0].role_id,
      token: newToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query("SELECT * FROM Person WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      console.error("El correo electrónico introducido es incorrecto.");
      return res
        .status(401)
        .json({ message: "El correo electrónico introducido es incorrecto." });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].psswrd);

    if (!validPassword) {
      console.error("La contraseña introducida es incorrecta.");
      return res
        .status(401)
        .json({ message: "La contraseña introducida es incorrecta." });
    }

    const newToken = jwtGenerator(user.rows[0].id);

    res.status(200).json({
      id: user.rows[0].id,
      firstName: user.rows[0].first_name,
      lastName: user.rows[0].last_name,
      phone: user.rows[0].phone,
      email: user.rows[0].email,
      avatar: user.rows[0].avatar,
      roleId: user.rows[0].role_id,
      token: newToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    res.status(200).json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
