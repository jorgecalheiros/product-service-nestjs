import { PropsProductEntity, Product } from "../../src/app/entities/product.entity";

type Override = Partial<PropsProductEntity>;

export class ProductFactory {
    static make(override: Override) {
        return (
            new Product({
                id: 1,
                name: "Chuchu",
                category: "legumes",
                amount: 10,
                price: 3.00,
                ...override
            })
        )
    }
}