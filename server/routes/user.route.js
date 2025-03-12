import { Router } from "express"
import { register, login, getUserInfo, logOut } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/user/info", getUserInfo)
userRouter.post("/logout", logOut)

export default userRouter; 