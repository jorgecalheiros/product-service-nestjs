import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'product',
        brokers: [process.env.UPSTASH_KAFKA_REST_SERVER],
        sasl: {
          mechanism: 'scram-sha-256',
          username: process.env.UPSTASH_KAFKA_REST_USERNAME,
          password: process.env.UPSTASH_KAFKA_REST_PASSWORD,
        },
        ssl: true,
      },
      consumer: {
        groupId: 'product-consumer'
      }
    }
  })

  const config = new DocumentBuilder()
    .setTitle('Products Service')
    .setDescription('Products service api')
    .setVersion('0.1')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.startAllMicroservices();
  app.listen(3002);
}
bootstrap();
