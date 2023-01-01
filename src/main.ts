import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { KafkaService } from './infra/messaging/kafka/kafka.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Products Service')
    .setDescription('Products service api')
    .setVersion('0.1')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const kafkaConsumerService = app.get(KafkaService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService
  })

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
