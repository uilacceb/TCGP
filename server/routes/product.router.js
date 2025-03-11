import { Router } from "express";
import { verifyToken } from "../controllers/user.controller.js";
import { addToCart, getCartItems } from "../controllers/product.controller.js";

const productRouter = Router();

// productRouter.post("/checkout", verifyToken, checkout);
productRouter.post("/cart/add", verifyToken, addToCart);
productRouter.get("/cart/:userID", verifyToken, getCartItems);

export default productRouter;