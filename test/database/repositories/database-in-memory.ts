import { Product } from "../../../src/app/entities/product.entity";
import { ProductRepositoryContract } from "../../../src/app/repositories/product-repository-contract";

export class DatabaseInMemory implements ProductRepositoryContract {
    public products: Product[] = [];

    async findMany(): Promise<Product[]> {
        return this.products;
    }

    async create(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }

}