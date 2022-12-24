import { ProductRepositoryContract } from 'src/app/repositories/product-repository-contract';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRepository } from './prisma/repositories/product-repository';

@Module({
    providers: [
        PrismaService,
        {
            provide: ProductRepositoryContract,
            useClass: ProductRepository
        }
    ],
    exports: [ProductRepositoryContract]
})
export class DatabaseModule { }
