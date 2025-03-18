import express from "express"
import cors from "cors"
import userRouter from "./routes/user.route.js";
import { ConnectDB } from "./db.js";
import dotenv from "dotenv"
import productRouter from "./routes/product.router.js";

dotenv.config();


const app = express();

app.use(express.json())
//app.use(cors())

ConnectDB();

// app.listen(8080, () => {
//   console.log("Server started")
// })

app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

ConnectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to pokemon Application" })
})

app.use("/auth", userRouter)
app.use("/product", productRouter)

export default app