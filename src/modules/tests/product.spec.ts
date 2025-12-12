import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Product Model", () => {
  it("should create a product", async () => {
    const product: Product = {
      name: "Test Product",
      price: 99.99,
      category_id: 1,
    };
    const createdProduct = await store.create(product);
    expect(createdProduct.name).toBe("Test Product");
    expect(createdProduct.category_id).toBe(1);
  });

  it("should list all products", async () => {
    const products = await store.index();
    expect(products.length).toBeGreaterThan(0);
  });

  it("should get a product by id", async () => {
    const product = await store.show(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
  });

  it("should get top five popular products", async () => {
    const popularProducts = await store.topFivePopularProducts();
    expect(popularProducts.length).toBeLessThanOrEqual(5);
  });

  it("shold get product by category", async () => {
    const categoryId = 1;
    const productsByCategory = await store.productsByCategory(categoryId);
    expect(productsByCategory.length).toBeGreaterThan(0);
  });
});
