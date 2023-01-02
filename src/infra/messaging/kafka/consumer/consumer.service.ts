import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class ConsumerService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: 'PRODUCT_SERVICE',
                brokers: [process.env.UPSTASH_KAFKA_REST_URL],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: process.env.UPSTASH_KAFKA_REST_USERNAME,
                    password: process.env.UPSTASH_KAFKA_REST_PASSWORD,
                },
                ssl: true,
            }
        })
    }

    async onModuleDestroy() {
        await this.close();
    }
}
