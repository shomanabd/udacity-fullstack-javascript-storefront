import pool from "../database";
export interface order {
  id?: number;
  user_id: number;
  status: string;
}

export class orderStore {
  async currentOrderByUser(user_id: number): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1 AND status='active'`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get current order for user ${user_id}. Error: ${err}`
      );
    }
  }
  async completedOrdersByUser(user_id: number): Promise<order[]> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1 AND status='complete'`;
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get completed orders for user ${user_id}. Error: ${err}`
      );
    }
  }

  async create(o: order): Promise<order> {
    try {
      const conn = await pool.connect();
      const sql = `INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *`;
      const result = await conn.query(sql, [o.user_id, o.status]);
      const createdOrder = result.rows[0];
      conn.release();
      return createdOrder;
    } catch (err) {
      throw new Error(
        `Could not create order for user ${o.user_id}. Error: ${err}`
      );
    }
  }

  async updateStatus(id: number, status: string): Promise<order> {
    try {
      const conn = await pool.connect();
      const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
      const result = await conn.query(sql, [status, id]);
      const updatedOrder = result.rows[0];
      conn.release();
      return updatedOrder;
    } catch (err) {
      throw new Error(`Could not update order ${id} status. Error: ${err}`);
    }
  }

  async addProductToOrder(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<{
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
  }> {
    try {
      const conn = await pool.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }
}
