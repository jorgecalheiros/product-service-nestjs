import { CreateProductDTO } from './dtos/create-product-dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductToHttp, ProductViewModel } from './view-models/product-view-model';

@Controller('product')
export class ProductController {
    constructor(private service: ProductService) { }

    @Get('')
    async getAllProducts(): Promise<string> {
        return "";
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
}
