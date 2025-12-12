import request from "supertest";
import app from "../../server";
import { generateTokenForUser } from "../../middleware/auth";

const token: string = generateTokenForUser({
  id: 1,
  first_name: "Test",
  last_name: "User",
});

let createOrder_id: number;
beforeAll(async () => {
  const response = await request(app)
    .post("/orders")
    .set("Authorization", `Bearer ${token}`)
    .send({ user_id: 1, status: "active" });

  createOrder_id = response.body.id;
});

describe("Order Controller", () => {
  it("should create a new order", async () => {
    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ user_id: 1, status: "active" });
    createOrder_id = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body.user_id).toBe(1);
    expect(response.body.status).toBe("active");
  });

  it("should get current orders by user", async () => {
    const response = await request(app)
      .get("/orders/current/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get completed orders by user", async () => {
    const response = await request(app)
      .get("/orders/completed/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should add product to order", async () => {
    const response = await request(app)
      .post(`/orders/${createOrder_id}/products`)
      .set("Authorization", `Bearer ${token}`)
      .send({ productId: 2, quantity: 2 });
    expect(response.status).toBe(200);
    expect(response.body.order_id).toBe(createOrder_id);
    expect(response.body.product_id).toBe(2);
    expect(response.body.quantity).toBe(2);
  });

  it("should update order status", async () => {
    const response = await request(app)
      .put(`/orders/${createOrder_id}`)

      .set("Authorization", `Bearer ${token}`)
      .send({ status: "complete" });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("complete");
  });
});
