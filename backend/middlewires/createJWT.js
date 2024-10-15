import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const createJWT = (admin) => {
  const token = jwt.sign({ id: admin._id, email: admin.email }, jwtSecret, {
    expiresIn: "30d",
  });
  return token;
};

export default createJWT;
