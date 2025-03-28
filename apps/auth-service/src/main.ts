import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  ConfigModule.forRoot({
    envFilePath: `.env.${process.env.SERVICE || 'auth-service'}`,
    isGlobal: true,
  });
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL!],
      queue: process.env.AUTH_QUEUE ?? 'auth_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}
bootstrap();
