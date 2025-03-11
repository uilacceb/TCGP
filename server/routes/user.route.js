import { Router } from "express"
import { register, login, getUserInfo } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/user/info", getUserInfo)

export default userRouter;