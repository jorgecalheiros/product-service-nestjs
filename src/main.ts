import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
    }
  )

  app.listen();
  /*
    app.useGlobalPipes(new ValidationPipe());
  
    const consumerService = app.get(ConsumerService)
    
      app.connectMicroservice<MicroserviceOptions>({
        strategy: consumerService
      })
*/
  /*
    const config = new DocumentBuilder()
      .setTitle('Product Service')
      .setDescription('Products service api')
      .setVersion('0.1')
      .addTag('Product')
      .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  
    await app.startAllMicroservices();
    await app.listen(3000);
    */
}
bootstrap();
