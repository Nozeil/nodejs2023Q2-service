import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get('port');

  const path = resolve(process.cwd(), 'doc', 'api.yaml');

  const file = (await readFile(path, 'utf-8')).toString();
  const document = yaml.load(file) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => console.log(`Server started on ${port}`));
}
bootstrap();
