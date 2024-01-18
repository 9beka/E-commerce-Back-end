import express from "express";
import {getProductsController} from "../controllers/products/getProductsController.js"
const router = express.Router();

router.get("/get-all-products" ,getProductsController)
export default router;