import { Product } from 'src/app/entities/product.entity';

export interface ProductToHttp {
    id: number
    name: string
    price: number
    category: string
    amount: number
}

export class ProductViewModel {
    static toHTTP(product: Product): ProductToHttp {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            amount: product.amount
        }
    }
}