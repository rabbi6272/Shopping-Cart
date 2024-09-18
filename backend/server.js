import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cors from "cors";
import connectDB from "./DB/shopingDB.js";
import routeHandler from "./routes/routeHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
