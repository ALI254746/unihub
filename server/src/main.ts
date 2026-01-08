import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Frontend (Next.js) backendga ulanishi uchun CORS ochildi
  await app.listen(4000, '0.0.0.0');
  console.log(`Backend server running on http://localhost:4000`);
}
bootstrap();
