import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import toggleRoutes from "./routes/favoriteRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import { fetchCocktails } from "./module/saveFakeShopDB.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 5057;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/product" , productRoutes)
app.use("/cart", cartRoutes);
app.use("/favorite", toggleRoutes);
app.use("/authRoutes", authRoutes);
app.get("/save-products" ,fetchCocktails )

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connect db success"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(port, () => {
  console.log("Server is running at localhost: " + port);
});
