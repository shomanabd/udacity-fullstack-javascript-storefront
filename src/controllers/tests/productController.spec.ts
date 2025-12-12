import request from "supertest";
import app from "../../server";
import { generateTokenForUser } from "../../middleware/auth";

const token: string = generateTokenForUser({
  id: 1,
  first_name: "Test",
  last_name: "User",
});

describe("Product Controller", () => {
  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Product",
        price: 99.99,
        category_id: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Product");
  });

  it("should get the list of products", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a product by ID", async () => {
    const response = await request(app).get("/products/1");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it("should get the top five popular products", async () => {
    const response = await request(app).get("/products/top-five-popular");
    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeLessThanOrEqual(5);
  });

  it("should get products by category", async () => {
    const response = await request(app).get("/products/category/1");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
