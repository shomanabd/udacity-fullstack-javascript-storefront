import { orderStore } from "../order";

const store = new orderStore();

describe("Order Model", () => {
  it("should create an order", async () => {
    const order = {
      user_id: 1,
      status: "active",
    };
    const createdOrder = await store.create(order);
    expect(createdOrder.user_id).toBe(1);
    expect(createdOrder.status).toBe("active");
  });

  it("should get current order by user", async () => {
    const currentOrders = await store.currentOrderByUser(1);
    expect(currentOrders.length).toBeGreaterThan(0);
    currentOrders.forEach((order) => {
      expect(order.user_id).toBe(1);
      expect(order.status).toBe("active");
    });
  });

  it("should update order status", async () => {
    const newOrder = await store.create({ user_id: 1, status: "active" });
    const updatedOrder = await store.updateStatus(
      newOrder.id as number,
      "complete"
    );
    expect(updatedOrder.status).toBe("complete");
  });

  it("should get completed orders by user", async () => {
    const completedOrders = await store.completedOrdersByUser(1);
    expect(completedOrders.length).toBeGreaterThan(0);
    completedOrders.forEach((order) => {
      expect(order.user_id).toBe(1);
      expect(order.status).toBe("complete");
    });
  });

  it("should not get current orders for non-existing user", async () => {
    const currentOrders = await store.currentOrderByUser(9999);
    expect(currentOrders.length).toBe(0);
  });

  it("should not get completed orders for non-existing user", async () => {
    const completedOrders = await store.completedOrdersByUser(9999);
    expect(completedOrders.length).toBe(0);
  });

  it("it should add a new product to an order", async () => {
    // First, create a new order
    const order = await store.create({ user_id: 1, status: "active" });
    const orderId = order.id as number;
    const quantity = 2;
    const productId = 1; // Assuming product with ID 1 exists
    const orderProduct = await store.addProductToOrder(
      quantity,
      orderId,
      productId
    );
    expect(orderProduct.quantity).toBe(quantity);
    expect(orderProduct.order_id).toBe(orderId);
    expect(orderProduct.product_id).toBe(productId);
  });
});
