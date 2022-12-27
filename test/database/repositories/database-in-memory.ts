import { Product } from "../../../src/app/entities/product.entity";
import { ProductRepositoryContract } from "../../../src/app/repositories/product-repository-contract";

export class DatabaseInMemory implements ProductRepositoryContract {
    public products: Product[] = [];


    async findOne(id: number): Promise<Product> {
        const product = this.products.filter(product => product.id == id);
        return product[0];
    }

    async findMany(): Promise<Product[]> {
        return this.products;
    }

    async create(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }

    async update(id: number, product: Partial<Product>): Promise<Product> {
        const index = this.products.findIndex(product => product.id == id);
        this.products[index].name = product.name ?? this.products[index].name;
        this.products[index].price = product.price ?? this.products[index].price;
        this.products[index].amount = product.amount ?? this.products[index].amount;
        this.products[index].category = product.category ?? this.products[index].category;
        return this.products[index];
    }

}