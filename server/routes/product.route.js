import { Router } from "express"
import { getAllProduct } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get("/", getAllProduct)

export default productRouter;