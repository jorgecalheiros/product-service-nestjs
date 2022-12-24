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


@Injectable()
export class ProductService {
    constructor(private repository: ProductRepositoryContract) { }

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
