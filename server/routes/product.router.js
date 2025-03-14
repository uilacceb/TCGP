import { Router } from "express";
import { verifyToken } from "../controllers/user.controller.js";
import { addToCart, removeCartItem, getCartItems, updateCartItem, checkout, getPurchasedItems } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/checkout", verifyToken, checkout);
productRouter.post("/cart/add", verifyToken, addToCart);
productRouter.get("/cart/:username", verifyToken, getCartItems);
productRouter.delete("/cart/remove", verifyToken, removeCartItem);
productRouter.put("/cart/update", verifyToken, updateCartItem);
productRouter.get("/cart/purchasedItems/:username", verifyToken, getPurchasedItems)


export default productRouter;