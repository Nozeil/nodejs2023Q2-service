import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { mkdir, readFile } from 'fs/promises';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { generateLoggingServiceOptions } from 'utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const logSize = configService.get('logSize');

  const swaggerDocPath = resolve(process.cwd(), 'doc', 'api.yaml');
  const logsFolderPath = resolve(process.cwd(), 'logs');

  const file = (await readFile(swaggerDocPath, 'utf-8')).toString();
  const document = yaml.load(file) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);

  await mkdir(logsFolderPath, { recursive: true });

  const options = await generateLoggingServiceOptions(logsFolderPath, logSize);

  app.useLogger(new LoggingService(options));

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port, () => console.log(`Server started on ${port}`));
}

bootstrap();
