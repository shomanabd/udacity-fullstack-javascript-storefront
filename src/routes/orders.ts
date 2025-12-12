import {
  createOrder,
  currentOrderByUser,
  completedOrdersByUser,
  updateOrderStatus,
  addProductsToOrder,
} from "../controllers/orderController";

import express from "express";
import { verifyAuthToken } from "../middleware/auth";

const ordersRouter = express.Router();

ordersRouter.get("/current/:user_id", verifyAuthToken, currentOrderByUser);
ordersRouter.get("/completed/:user_id", verifyAuthToken, completedOrdersByUser);
ordersRouter.post("/", verifyAuthToken, createOrder);
ordersRouter.post("/:id/products", verifyAuthToken, addProductsToOrder);
ordersRouter.put("/:id", verifyAuthToken, updateOrderStatus);

export default ordersRouter;
