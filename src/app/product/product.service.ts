import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductRepositoryContract } from '../repositories/product-repository-contract';

export interface ProductCreateRequest {
    name: string
    price: number
    amount: number
    category: string
}

export interface ProductSaveResponse {
    product: Product
}

export interface ProductListResponse {
    products: Product[]
}

@Injectable()
export class ProductService {
    constructor(private repository: ProductRepositoryContract) { }

    async list(): Promise<ProductListResponse> {
        const products = await this.repository.findMany();
        return {
            products
        }
    }

    async show(id: number): Promise<ProductSaveResponse> {
        const product = await this.repository.findOne(id);
        return {
            product
        }
    }

    async store({ name, price, amount, category }: ProductCreateRequest): Promise<ProductSaveResponse> {
        const product = await this.repository.create(
            new Product({
                name,
                price,
                amount,
                category
            })
        )

        return {
            product
        }
    }

    async edit(id: number, { name, amount, category, price }: Partial<ProductCreateRequest>): Promise<ProductSaveResponse> {
        const product = await this.repository.update(id, { name, amount, category, price });
        return {
            product
        }
    }

    async changeStock(id: number, amount: number): Promise<ProductSaveResponse> {
        const productFound = await this.repository.findOne(id);
        const stock = productFound.amount + amount;
        const product = await this.repository.update(id, {
            amount: stock
        })
        return {
            product
        }
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
