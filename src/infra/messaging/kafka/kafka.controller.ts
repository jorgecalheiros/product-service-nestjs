import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from 'src/app/product/product.service';

interface CreateProductPayload {
    name: string
    price: number
    category: string
    amount: number
}

@Controller('kafka')
export class KafkaController {
    constructor(private productService: ProductService) { }

    @EventPattern('products.create-product')
    async handleCreateProduct(
        @Payload() { name, price, amount, category }: CreateProductPayload
    ): Promise<any> {
        await this.productService.store({ name, price, amount, category });
    }
}
