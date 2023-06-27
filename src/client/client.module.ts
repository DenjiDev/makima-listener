import { Module } from '@nestjs/common';
import { ClientService } from './client.service';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MAKIMA',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL],
          queue: 'engine_queue',
          queueOptions: {
            durable: false,
          },
        }
      },
    ]),

  ],
  providers: [ClientService]
})
export class ClientModule { }