import { Module } from '@nestjs/common';
import { ProductModule } from './app/product/product.module';
import { DatabaseModule } from './infra/database/database.module';
import { MessagingModule } from './infra/messaging/messaging.module';
@Module({
  imports: [ProductModule, DatabaseModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
