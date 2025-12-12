import pool from "../database";
export interface Product {
  id?: number;
  name: string;
  price: number;
  category_id?: number;
  category?: string;
  total_quantity?: number;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT p.id, p.name as name, p.price, c.name as category
                     FROM products p
                     JOIN categories c ON p.category_id = c.id`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT p.id, p.name as name, p.price, c.name as category
                     FROM products p
                     JOIN categories c ON p.category_id = c.id
                     WHERE p.id = $1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await pool.connect();
      const sql =
        "INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [p.name, p.price, p.category_id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async topFivePopularProducts(): Promise<Product[]> {
    const conn = await pool.connect();
    try {
      const sql = `
      SELECT p.id, p.name, p.price, c.name as category, SUM(op.quantity) AS total_quantity
      FROM order_products op
      INNER JOIN products p ON op.product_id = p.id
      INNER JOIN categories c ON p.category_id = c.id
      GROUP BY p.id, p.name, p.price, c.name
      ORDER BY total_quantity DESC
      LIMIT 5
    `;
      const result = await conn.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get top five popular products. Error: ${err}`);
    } finally {
      conn.release();
    }
  }

  async productsByCategory(category_id: number): Promise<Product[]> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT p.id, p.name as name, p.price, c.name as category
                      FROM products p
                      JOIN categories c ON p.category_id = c.id
                      WHERE c.id = $1`;
      const result = await conn.query(sql, [category_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get products by category ${category_id}. Error: ${err}`
      );
    }
  }
  async createCategory(category_name: string): Promise<number> {
    try {
      const conn = await pool.connect();
      const sql = "INSERT INTO categories (name) VALUES($1) RETURNING *";
      const result = await conn.query(sql, [category_name]);
      const category_id = result.rows[0].id;
      conn.release();
      return category_id;
    } catch (err) {
      throw new Error(
        `Could not add new category ${category_name}. Error: ${err}`
      );
    }
  }
}
