import { Router } from "express";
import { verifyToken } from "../controllers/user.controller.js";
import { addToCart, removeCartItem, getCartItems, updateCartItem, checkout, getPurchasedItems, getAvailableMoney, removePurchasedItem } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/checkout", verifyToken, checkout);
productRouter.get("/availableMoney", verifyToken, getAvailableMoney)

productRouter.post("/cart", verifyToken, addToCart);
productRouter.get("/cart", verifyToken, getCartItems);
productRouter.delete("/cart", verifyToken, removeCartItem);
productRouter.put("/cart", verifyToken, updateCartItem);


productRouter.get("/purchasedItems", verifyToken, getPurchasedItems)
productRouter.delete("/purchasedItems", verifyToken, removePurchasedItem)


export default productRouter;