import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port: number = configService.get('port');

  const path = resolve(process.cwd(), 'doc', 'api.yaml');

  const file = (await readFile(path, 'utf-8')).toString();
  const document = yaml.load(file) as OpenAPIObject;
  const { httpAdapter } = app.get(HttpAdapterHost);

  SwaggerModule.setup('doc', app, document);

  app.useLogger(new LoggingService());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port, () => console.log(`Server started on ${port}`));
}
bootstrap();
