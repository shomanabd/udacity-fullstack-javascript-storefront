import { User, UserStore } from "../user";

const store = new UserStore();

describe("User Model", () => {
  it("should create a user", async () => {
    const user: User = {
      first_name: "John",
      last_name: "Doe",
      password: "password123",
    };
    const createdUser = await store.create(user);
    expect(createdUser).toBeDefined;
  });

  it("should list all users", async () => {
    const users = await store.index();
    expect(users.length).toBeGreaterThan(0);
  });

  it("should get a user by id", async () => {
    const user = await store.show(1);
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });
});
