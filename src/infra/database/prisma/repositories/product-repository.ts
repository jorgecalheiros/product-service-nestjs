import { Injectable } from '@nestjs/common';
import { Product } from 'src/app/entities/product.entity';
import { ProductRepositoryContract } from 'src/app/repositories/product-repository-contract';
import { ProductMapper } from '../../mappers/product-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductRepository implements ProductRepositoryContract {
    constructor(private prisma: PrismaService) { }
    async update(id: number, product: Partial<Product>): Promise<Product> {
        const response = await this.prisma.product.update({
            data: ProductMapper.toDatabasePrisma(product),
            where: { id }
        })
        return ProductMapper.toDomain(response);
    }

    async findOne(id: number): Promise<Product> {
        const response = await this.prisma.product.findFirst({
            where: { id }
        })
        return ProductMapper.toDomain(response);
    }

    async findMany(): Promise<Product[]> {
        const response = await this.prisma.product.findMany();
        return response.map(ProductMapper.toDomain);
    }

    async create(product: Product): Promise<Product> {
        const response = await this.prisma.product.create({
            data: ProductMapper.toDatabasePrisma(product)
        })
        return ProductMapper.toDomain(response);
    }

}