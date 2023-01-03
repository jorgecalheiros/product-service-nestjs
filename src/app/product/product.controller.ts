import { PRODUCT_SERVICE_TOPICS } from './../topics/product-service';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ProductCreateRequest, ProductService } from './product.service';
import { ProductToHttp, ProductViewModel } from './view-models/product-view-model';
import { ApiTags } from '@nestjs/swagger';
import { EventPattern, Payload } from '@nestjs/microservices';

export interface ProductUpdateRequest {
    id: number,
    product: Partial<ProductCreateRequest>
}

export interface ProductDeleteRequest {
    id: number
}

export interface ProductChangestockRequest {
    id: number
    amount: number
}

@ApiTags('Products')
@Controller('/api/v1/products')
export class ProductController {
    private readonly logger = new Logger('PRODUCT_SERVICE')
    constructor(private service: ProductService) { }

    @Get()
    async getAllProducts(): Promise<ProductToHttp[]> {
        try {
            const { products } = await this.service.list();
            return products.map(ProductViewModel.toHTTP);
        } catch (error) {
            return error;
        }
    }

    @Get(':id')
    async getOneProduct(
        @Param('id') id: string
    ): Promise<ProductToHttp> {
        try {
            const { product } = await this.service.show(parseInt(id));
            return ProductViewModel.toHTTP(product);
        } catch (error) {
            return error;
        }
    }

    @EventPattern(PRODUCT_SERVICE_TOPICS.create_product)
    async handleProductCreated(
        @Payload() data: ProductCreateRequest
    ) {
        const { product } = await this.service.store(data);
        this.logger.log(`A product was created, product id:${product.id}`);
    }

    @EventPattern(PRODUCT_SERVICE_TOPICS.update_product)
    async handleUpdateProduct(
        @Payload() payload: ProductUpdateRequest
    ): Promise<any> {
        const { product } = await this.service.edit(payload.id, payload.product);
        this.logger.log(`A product of id ${product.id} has been updated`);
    }

    @EventPattern(PRODUCT_SERVICE_TOPICS.delete_product)
    async handleDeleteProduct(
        @Payload() payload: ProductDeleteRequest
    ) {
        await this.service.delete(payload.id);
        this.logger.log(`A product of id ${payload.id} has been deleted`);
    }

    @EventPattern(PRODUCT_SERVICE_TOPICS.changestock_product)
    async handleChangeStockProduct(
        @Payload() payload: ProductChangestockRequest
    ) {
        const { product } = await this.service.changeStock(payload.id, payload.amount)
        this.logger.log(`O estoque do produto ${product.id} foi alterado`);
    }

    /*
    @Post()
    async createProduct(
        @Body() { name, amount, price, category }: CreateProductDTO
    ): Promise<ProductToHttp> {
        const { product } = await this.service.store({
            name, price, amount, category
        });

        return ProductViewModel.toHTTP(product);
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() { name, amount, category, price }: UpdateProductDTO
    ): Promise<ProductToHttp> {
        const { product } = await this.service.edit(parseInt(id), { name, amount, category, price });
        return ProductViewModel.toHTTP(product);
    }

    @Put('changestock/:id')
    async changeStockProduct(
        @Param('id') id: string,
        @Body() { amount }: ChangeStockProductDTO
    ): Promise<ProductToHttp> {
        const { product } = await this.service.changeStock(parseInt(id), amount);
        return ProductViewModel.toHTTP(product);
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id') id: string,
    ): Promise<void> {
        await this.service.delete(parseInt(id));
    }
    */
}
