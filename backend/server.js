import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./DB/shopingDB.js";
import routeHandler from "./routes/routeHandler.js";
import adminRouteHandler from "./routes/adminRouteHandler.js";

const app = express();
const PORT = process.env.PORT;
const env = process.env.NODE_ENV;
const __dirname = path.resolve();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    credentials: true, // Allow sending cookies with requests
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouteHandler);
app.use("/api/products", routeHandler);

if (env === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
