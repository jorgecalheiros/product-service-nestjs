import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { ConsumerService } from './kafka/consumer/consumer.service';
import { ConsumerController } from './kafka/consumer/consumer.controller';
import { ProductService } from 'src/app/product/product.service';

@Module({
  imports: [DatabaseModule],
  providers: [ConsumerService, ProductService],
  controllers: [ConsumerController],
})
export class MessagingModule { }
