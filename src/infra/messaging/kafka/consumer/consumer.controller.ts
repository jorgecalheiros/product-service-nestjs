import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProductService } from 'src/app/product/product.service';

interface CreateProductPayload {
    name: string
    price: number
    category: string
    amount: number
}

interface UpdateProductPayload {
    id: number,
    product: Partial<CreateProductPayload>
}

interface DeleteProductPayload {
    id: number
}



@Controller()
export class ConsumerController {
    constructor(private readonly productService: ProductService) { }

    @EventPattern('products.create-product')
    async handleCreateProduct(
        @Payload() product: CreateProductPayload
    ): Promise<any> {
        await this.productService.store(product);
    }

    @EventPattern('products.update-product')
    async handleUpdateProduct(
        @Payload() payload: UpdateProductPayload
    ): Promise<any> {
        await this.productService.edit(payload.id, payload.product);
    }

    @EventPattern('products.delete-product')
    async handleDeleteProduct(
        @Payload() payload: DeleteProductPayload
    ) {
        await this.productService.delete(payload.id);
    }
}
