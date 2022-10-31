import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authorizeUser = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).json({ message: "No autorizado." });
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json({ message: "No autorizado." });
  }
};

export default authorizeUser;
