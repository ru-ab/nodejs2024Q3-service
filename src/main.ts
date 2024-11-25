import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/allExceptions.filter';
import { LoggerServiceImp } from './logger/logger.service';

function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

process.on('uncaughtException', (error) => {
  const logger = new Logger('UncaughtException');
  logger.error(error);
});

process.on('unhandledRejection', (error) => {
  const logger = new Logger('UnhandledRejection');
  logger.error(error);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useLogger(app.get(LoggerServiceImp));
  app.useGlobalFilters(new AllExceptionsFilter());

  configSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') ?? 4000;

  await app.listen(port);
}
bootstrap();
