import { Product } from './product.entity';
describe("Product test", () => {
    it("Should be able to create a product", () => {
        const product = new Product({
            name: "Melão",
            price: 5.00,
            amount: 10,
            category: "fruta"
        });

        expect(product).toBeTruthy();
    })
})  