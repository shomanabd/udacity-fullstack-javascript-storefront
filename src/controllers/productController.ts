import { Request, Response } from "express";
import { ProductStore, Product } from "../modules/product";

const store = new ProductStore();

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const prod = await store.show(id);
    res.json(prod);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData: Product = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    };
    const newProduct = await store.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const topFivePopularProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await store.topFivePopularProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const productsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoryId: number = parseInt(req.params.category_id);
    const products = await store.productsByCategory(categoryId);
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
