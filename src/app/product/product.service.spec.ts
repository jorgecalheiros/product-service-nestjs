import { ProductFactory } from './../../../test/factories/product-factory';
import { DatabaseInMemory } from "../../../test/database/repositories/database-in-memory"
import { ProductService } from "./product.service";

describe("Product Service", () => {
  it("should be able to create a product", async () => {
    const repository = new DatabaseInMemory();
    const service = new ProductService(repository);

    const { product } = await service.store({
      name: "Maça",
      price: 3.00,
      amount: 150,
      category: "fruta"
    })

    expect(repository.products).toHaveLength(1);
    expect(repository.products[0]).toBe(product);
  });

  it("should be able to get a list of product", async () => {
    const repository = new DatabaseInMemory();
    const service = new ProductService(repository);

    for (let i = 0; i < 10; i++) {
      const product = ProductFactory.make({});
      repository.create(product);
    }
    const { products } = await service.list();

    expect(products).toBe(repository.products);
    expect(products).toHaveLength(10);
  })
})