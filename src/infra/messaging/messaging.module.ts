import { Module } from '@nestjs/common';
import { ProductService } from 'src/app/product/product.service';
import { DatabaseModule } from '../database/database.module';
import { KafkaController } from './kafka/kafka.controller';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [DatabaseModule],
  controllers: [KafkaController],
  providers: [KafkaService, ProductService]
})
export class MessagingModule { }
