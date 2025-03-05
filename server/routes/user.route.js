import { Router } from "express"
import { register, login, verifyToken } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/login", verifyToken, login)

export default userRouter;