import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Initializing .env
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dbh92pwr9/image/upload/v1667188207/HonduMarket/avatar.png";

export default cloudinary;
