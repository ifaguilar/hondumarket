import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtGenerator = (userId, expiration) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
};

export default jwtGenerator;
