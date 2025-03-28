import { NestFactory } from '@nestjs/core';
import { UsersServiceModule } from './users-service.module';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  ConfigModule.forRoot({
    envFilePath: `.env.${process.env.SERVICE || 'users-service'}`,
    isGlobal: true,
  });
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL!],
      queue: process.env.USER_QUEUE ?? 'users_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}
bootstrap();
