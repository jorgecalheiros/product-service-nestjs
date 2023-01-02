import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductToHttp, ProductViewModel } from './view-models/product-view-model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('product')
export class ProductController {
    constructor(private service: ProductService) { }

    @Get()
    async getAllProducts(): Promise<ProductToHttp[]> {
        const { products } = await this.service.list();
        return products.map(ProductViewModel.toHTTP);
    }

    @Get(':id')
    async getOneProduct(
        @Param('id') id: string
    ): Promise<ProductToHttp> {
        const { product } = await this.service.show(parseInt(id));
        return ProductViewModel.toHTTP(product);
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
