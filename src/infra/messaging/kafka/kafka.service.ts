import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService extends ServerKafka implements OnModuleDestroy {
    constructor() {
        super({
            client: {
                clientId: '',
                brokers: [''],
                sasl: {
                    mechanism: '',
                    username: '',
                    password: '',
                },
                ssl: true,
            }
        })
    }

    onModuleDestroy() {
        this.close();
    }

}
