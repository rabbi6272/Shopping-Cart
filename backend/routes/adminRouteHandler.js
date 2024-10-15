import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bcrypt from "bcrypt";
import Admin from "../model/admin.model.js";
import createJWT from "../middlewires/createJWT.js";

const adminSecret = process.env.ADMIN_SECRET;
const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  const cookies = req.cookies.admin_token;
  if (cookies) {
    return res
      .status(403)
      .json({ success: false, message: "Already logged in" });
  }
  const { email, password, rememberMe } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Create and send JWT token here
    const token = createJWT(admin);
    let expieryTime = rememberMe
      ? 1000 * 60 * 60 * 24 * 30
      : 1000 * 60 * 60 * 24;
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expieryTime,
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      tempToken: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || "Server Error" });
  }
});

adminRouter.post("/logout", (req, res) => {
  res.clearCookie("admin_token");
  res.status(200).json({ success: true, message: "Logout successful" });
});

adminRouter.post("/register", async (req, res) => {
  const { name, email, password, secretCode } = req.body;
  if (!name || !email || !password || !secretCode) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  if (secretCode !== adminSecret) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid secret code" });
  }
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      secretCode,
    });

    // Set the JWT as an HTTP-only cookie
    let token = createJWT(admin);
    res.cookie("admin_token", token);

    // Save the admin to the database
    await admin.save();
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token: token,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: error.message || "Server Error" });
  }
});

export default adminRouter;
