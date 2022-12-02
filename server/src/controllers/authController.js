import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../database/db.js";

// Utils
import { DEFAULT_AVATAR_URL } from "../utils/cloudinaryGenerator.js";
import jwtGenerator from "../utils/jwtGenerator.js";
import transporter from "../utils/nodemailerGenerator.js";

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

    await db.query(
      "INSERT INTO Person_Address (person_id, municipality_id) VALUES ($1, $2)",
      [newUser.rows[0].id, municipalityId]
    );

    const newToken = jwtGenerator(newUser.rows[0].id, "1h");

    res.status(200).json({
      success: true,
      user: {
        id: newUser.rows[0].id,
        firstName: newUser.rows[0].first_name,
        lastName: newUser.rows[0].last_name,
        phone: newUser.rows[0].phone,
        email: newUser.rows[0].email,
        avatar: newUser.rows[0].avatar,
        roleId: newUser.rows[0].role_id,
      },
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

    if (!user.rows[0].is_active) {
      return res
        .status(401)
        .json({ message: "Este usuario esta inactivo, contactate con soporte para la reactivacion del mismo." });
    }

    const newToken = jwtGenerator(user.rows[0].id, "1h");

    res.status(200).json({
      success: true,
      user: {
        id: user.rows[0].id,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
        phone: user.rows[0].phone,
        email: user.rows[0].email,
        avatar: user.rows[0].avatar,
        roleId: user.rows[0].role_id,
      },
      token: newToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await db.query("SELECT * FROM Person WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      console.error("El correo electrónico introducido es incorrecto.");
      return res
        .status(401)
        .json({ message: "El correo electrónico introducido es incorrecto." });
    }

    const newToken = jwtGenerator(user.rows[0].id, "5m");

    const tokenURL = newToken.replace(/\./g, "&");

    const link = `http://127.0.0.1:5000/reset-password/${user.rows[0].id}/${tokenURL}`;

    const mailOptions = {
      from: `"HonduMarket" ${process.env.MAIL_USER}`,
      to: email,
      subject: "Reestablecimiento de contraseña | HonduMarket",
      text: link,
      template: "resetPassword",
      context: {
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
        email: user.rows[0].email,
        link: link,
      },
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log("Correo enviado: " + info.response);
      }
    });

    res.status(200).json({
      success: true,
      message:
        "Se ha enviado un correo para que puedas reestablecer tu contraseña. Por favor, verifica tu bandeja de entrada.",
      resetToken: newToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, token, password } = req.body;

    const user = await db.query("SELECT * FROM Person WHERE id = $1", [id]);

    if (user.rowCount === 0) {
      console.error("El usuario no existe.");
      return res.status(401).json({ message: "El usuario no existe." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await db.query("UPDATE Person SET psswrd = $1 WHERE id = $2", [
        hashedPassword,
        id,
      ]);

      res.status(200).json({
        success: true,
        message: "Contraseña actualizada éxitosamente.",
      });
    } else {
      console.error(
        "No se pudo reestablecer tu contraseña. Vuelve a intentarlo más tarde."
      );
      res.status(401).json({
        message:
          "No se pudo reestablecer tu contraseña. Vuelve a intentarlo más tarde.",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
