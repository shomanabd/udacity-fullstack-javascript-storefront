import { Request, Response } from "express";
import { orderStore, order } from "../modules/order";

const orderStoreInstance = new orderStore();

export const currentOrderByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.user_id);
    const orders = await orderStoreInstance.currentOrderByUser(userId);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const completedOrdersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId: number = parseInt(req.params.user_id);
    const orders = await orderStoreInstance.completedOrdersByUser(userId);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderData: order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newOrder = await orderStoreInstance.create(orderData);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const status: string = req.body.status;
    const updatedOrder = await orderStoreInstance.updateStatus(id, status);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addProductsToOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId: number = parseInt(req.params.id);
    const productId: number = req.body.productId;
    const quantity: number = req.body.quantity;
    const addedProduct = await orderStoreInstance.addProductToOrder(
      quantity,
      orderId,
      productId
    );
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};
