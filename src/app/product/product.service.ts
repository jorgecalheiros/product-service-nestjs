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
}
