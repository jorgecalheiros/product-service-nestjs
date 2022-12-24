import Prisma from '@prisma/client';
import { Product } from './../../../app/entities/product.entity';
export class ProductMapper {
    static toDatabase(product: Product) {
        return {
            name: product.name,
            price: product.price,
            category: product.category,
            amount: product.amount
        }
    }

    static toDomain(raw: Prisma.Product): Product {
        return (
            new Product({
                name: raw.name,
                price: raw.price.toNumber(),
                category: raw.category,
                amount: raw.amount,
                id: raw.id
            })
        )
    }
}