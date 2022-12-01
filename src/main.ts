import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './shared/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.enableVersioning();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application succesfully started on port ${port}`);
}
bootstrap();
