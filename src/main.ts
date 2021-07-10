import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as YAML from 'yamljs';
import * as path from 'path';
import { configuration } from './config/configuration';

const DIR_NAME = path.resolve(path.dirname(''));
const swaggerDocument = YAML.load(path.join(DIR_NAME, './doc/api.yaml'));

async function expressBootstrap() {
  console.log('Use Express');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('doc', app, document);
  await app.listen(configService.get<number>('PORT'));
}

async function fastifyBootstrap() {
  console.log('Use Fastify');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('doc', app, document);
  await app.listen(configService.get<number>('PORT'), '0.0.0.0');
}

const useFastify = configuration.useFastify();

if (useFastify) {
  fastifyBootstrap();
} else {
  expressBootstrap();
}
