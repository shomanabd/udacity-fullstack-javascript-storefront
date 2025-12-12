import {
  index,
  show,
  create,
  topFivePopularProducts,
  productsByCategory,
} from "../controllers/productController";
import express from "express";
import { verifyAuthToken } from "../middleware/auth";

const productsRouter = express.Router();
productsRouter.get("/top-five-popular", topFivePopularProducts);
productsRouter.get("/", index);
productsRouter.get("/:id", show);
productsRouter.post("/", verifyAuthToken, create);
productsRouter.get("/category/:category_id", productsByCategory);

export default productsRouter;
