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
  })
})