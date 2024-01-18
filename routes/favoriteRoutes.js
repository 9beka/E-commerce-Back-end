import express from "express";
import { verifyToken } from "../midleWares/verifyToken.js";
import { toggleFavoriteController } from "../controllers/cart/toggleFavoriteController.js";
import { getFavoritesController } from "../controllers/cart/getFavoritesController.js";

const router = express.Router();

router.post(
  "/toggle-favorite/:productId",
  verifyToken,
  toggleFavoriteController
);
router.get("/get-favorites", verifyToken, getFavoritesController);

export default router;
