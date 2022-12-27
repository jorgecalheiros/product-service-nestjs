import { CreateProductDTO } from './dtos/create-product-dto';
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductToHttp, ProductViewModel } from './view-models/product-view-model';
import { UpdateProductDTO } from './dtos/update-product-dto';

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
}
