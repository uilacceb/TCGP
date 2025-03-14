import { Router } from "express";
import { verifyToken } from "../controllers/user.controller.js";
import { addToCart, removeCartItem, getCartItems, updateCartItem, checkout, getPurchasedItems, getAvailableMoney } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/checkout", verifyToken, checkout);
productRouter.post("/cart/add", verifyToken, addToCart);
productRouter.get("/cart/:username", verifyToken, getCartItems);
productRouter.delete("/cart/remove", verifyToken, removeCartItem);
productRouter.put("/cart/update", verifyToken, updateCartItem);
productRouter.get("/cart/purchasedItems/:username", verifyToken, getPurchasedItems)
productRouter.get("/availableMoney/:username", verifyToken, getAvailableMoney)


export default productRouter;