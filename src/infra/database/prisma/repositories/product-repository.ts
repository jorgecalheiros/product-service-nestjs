import { Injectable } from '@nestjs/common';
import { Product } from 'src/app/entities/product.entity';
import { ProductRepositoryContract } from 'src/app/repositories/product-repository-contract';
import { ProductMapper } from '../../mappers/product-mapper';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ProductRepository implements ProductRepositoryContract {
    constructor(private prisma: PrismaService) { }

    async create(product: Product): Promise<Product> {
        const response = await this.prisma.product.create({
            data: ProductMapper.toDatabase(product)
        })
        return ProductMapper.toDomain(response);
    }

}