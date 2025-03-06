import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js";
import { ConnectDB } from "./db.js";
import dotenv from "dotenv"

dotenv.config();


const app = express();

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)

ConnectDB();

app.listen(8080, () => {
  console.log("Server started")
})