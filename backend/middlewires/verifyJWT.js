import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const verifyJWT = async (req, res, next) => {
  const token = req.cookies.admin_token;
  // const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default verifyJWT;
