import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from './validation';

import { useContainer } from 'class-validator';
// import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: errors => new BadRequestException(errors), // TODO: Use graphql errors instead
  //     forbidUnknownValues: true,
  //   }),
  // );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const appPort = configService.get<number>('APP_PORT', 3000);
  await app.listen(appPort);
}

bootstrap();
