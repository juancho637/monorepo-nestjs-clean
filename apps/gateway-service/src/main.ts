import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  ConfigModule.forRoot({
    envFilePath: `.env.${process.env.SERVICE || 'gateway-service'}`,
    isGlobal: true,
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
