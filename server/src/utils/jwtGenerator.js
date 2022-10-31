import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtGenerator = (userId) => {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

export default jwtGenerator;
