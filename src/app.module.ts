import { Module } from '@nestjs/common';
import { ProductModule } from './app/product/product.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [ProductModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
