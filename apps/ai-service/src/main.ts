import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AiServiceModule } from './ai-service.module';

async function bootstrap() {
  ConfigModule.forRoot({
    envFilePath: `.env.${process.env.SERVICE || 'ai-service'}`,
    isGlobal: true,
  });
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AiServiceModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL!],
      queue: process.env.AI_QUEUE ?? 'ai_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.listen();
}
bootstrap();
