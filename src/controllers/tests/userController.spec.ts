import request from "supertest";
import app from "../../server";
import { generateTokenForUser } from "../../middleware/auth";

const token: string = generateTokenForUser({
  id: 1,
  first_name: "Test",
  last_name: "User",
});

describe("User Controller", () => {
  it("should create a new user", async () => {
    const response = await request(app).post("/users").send({
      first_name: "John",
      last_name: "Doe",
      password: "password123",
    });
    expect(response.status).toBe(201);
  });
  it("should get the list of users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("should get a user by ID", async () => {
    const response = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });
});
