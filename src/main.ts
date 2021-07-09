import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as YAML from 'yamljs';
import * as path from 'path';

const DIR_NAME = path.resolve(path.dirname(''));
const swaggerDocument = YAML.load(path.join(DIR_NAME, './doc/api.yaml'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('doc', app, document);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
