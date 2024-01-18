import express from "express";
import { verifyToken } from "../midleWares/verifyToken.js";
import { addProductToCartController } from "../controllers/cart/addProductToCartController.js";
import { getCartProductsController } from "../controllers/cart/getCartProductsController.js";
import { decreaseCartFromCartController } from "../controllers/cart/decreaseCartFromCartController.js";
const router = express.Router();

router.post("/add-to-cart/:productId", verifyToken, addProductToCartController);
router.post("/decrease-cart/:productId", verifyToken,decreaseCartFromCartController );
router.get("/get-cart-products", verifyToken, getCartProductsController);

export default router;
