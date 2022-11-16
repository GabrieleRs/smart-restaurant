import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundErrorFilter } from './errors/not-found-error.filter';
import { StatusErrorFilter } from './errors/status_error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new NotFoundErrorFilter(), new StatusErrorFilter());
  await app.listen(3000);
}
bootstrap();
