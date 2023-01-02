import { Controller, Logger } from '@nestjs/common';
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

interface ChangeStockProductPayload {
    id: number
    amount: number
}



@Controller()
export class ConsumerController {
    private readonly logger = new Logger('PRODUCT_SERVICE')

    constructor(private readonly productService: ProductService) { }

    @EventPattern('products.create-product')
    async handleCreateProduct(
        @Payload() payload: CreateProductPayload
    ): Promise<any> {
        const { product } = await this.productService.store(payload);
        this.logger.log(`A product was created, product id:${product.id}`);
    }

    @EventPattern('products.update-product')
    async handleUpdateProduct(
        @Payload() payload: UpdateProductPayload
    ): Promise<any> {
        const { product } = await this.productService.edit(payload.id, payload.product);
        this.logger.log(`A product of id ${product.id} has been updated`);
    }

    @EventPattern('products.delete-product')
    async handleDeleteProduct(
        @Payload() payload: DeleteProductPayload
    ) {
        await this.productService.delete(payload.id);
        this.logger.log(`A product of id ${payload.id} has been deleted`);
    }

    @EventPattern('products.changestock-product')
    async handleChangeStockProduct(
        @Payload() payload: ChangeStockProductPayload
    ) {
        const { product } = await this.productService.changeStock(payload.id, payload.amount)
        this.logger.log(`O estoque do produto de id ${product.id} foi alterado`);
    }
}
