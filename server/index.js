import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js";
import { ConnectDB } from "./db.js";
import dotenv from "dotenv"
import productRouter from "./routes/product.route.js";

dotenv.config();


const app = express();

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use("/product", productRouter)

ConnectDB();

app.listen(8080, () => {
  console.log("Server started")
})