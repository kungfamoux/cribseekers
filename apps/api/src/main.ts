import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new LoggerService(),
  });

  const configService = app.get(ConfigService);
  const logger = app.get(LoggerService);

  const port = configService.get<number>('port') || 3001;
  const apiPrefix = configService.get<string>('apiPrefix') || 'api';
  const apiVersion = configService.get<string>('apiVersion') || '1';
  const corsOrigin = configService.get<string>('corsOrigin') || '*';

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  app.use(helmet());
  app.use(compression());

  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiVersion,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('CribSeekers API')
    .setDescription('Modern Nigerian real estate platform API')
    .setVersion(apiVersion)
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('properties', 'Property listings')
    .addTag('inspections', 'Property inspections')
    .addTag('payments', 'Payment processing')
    .addTag('wallet', 'Wallet management')
    .addTag('agents', 'Agent management')
    .addTag('reviews', 'Reviews and ratings')
    .addTag('notifications', 'Notifications')
    .addTag('chat', 'Messaging')
    .addTag('health', 'Health check')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}/${apiPrefix}/v${apiVersion}`);
  logger.log(`Swagger documentation: http://localhost:${port}/${apiPrefix}/docs`);
}

bootstrap();
