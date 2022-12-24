import { Product } from "../entities/product.entity";

export abstract class ProductRepositoryContract {
    abstract create(product: Product): Promise<Product>
}