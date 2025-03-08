import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  Logger.log(`Server run on 3000 port`);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
