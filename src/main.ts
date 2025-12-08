import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from 'path';
import dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {
  prefix: '/uploads/',
});
  console.log('🚀 Facecrook running on http://localhost:3000');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
