import { Router } from "express"
import { register, login, getUserInfo, getUserPurchase, addToCart } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/user/info", getUserInfo)
userRouter.post("/user/cart/add", addToCart);

export default userRouter;