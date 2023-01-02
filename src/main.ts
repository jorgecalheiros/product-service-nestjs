import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConsumerService } from './infra/messaging/kafka/consumer/consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const consumerService = app.get(ConsumerService)

  app.connectMicroservice<MicroserviceOptions>({
    strategy: consumerService
  })

  const config = new DocumentBuilder()
    .setTitle('Products Service')
    .setDescription('Products service api')
    .setVersion('0.1')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
