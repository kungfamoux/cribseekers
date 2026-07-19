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
import { initializeTracing } from './infrastructure/tracing/tracing.config';

async function bootstrap() {
  // Initialize OpenTelemetry tracing if enabled
  if (process.env.TRACING_ENABLED === 'true') {
    const tracingEndpoint = process.env.TRACING_ENDPOINT || 'http://localhost:4318';
    const serviceName = process.env.TRACING_SERVICE_NAME || 'cribseekers-api';
    initializeTracing(serviceName, tracingEndpoint);
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const logger = app.get(LoggerService);

  app.enableShutdownHooks();

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

  // Trust proxy for Render (behind load balancer)
  if (process.env.TRUST_PROXY === 'true') {
    app.getHttpAdapter().getInstance().set('trust proxy', true);
  }

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
    .setDescription('Modern Nigerian real estate platform API. Authentication: JWT Bearer tokens. Pagination: page, limit parameters. Sorting: sort=field:direction. Filtering: query parameters. Rate limiting: 100 req/min per IP, 1000 req/min per user. Error responses: RFC7807 Problem Details format. WebSocket: ws://localhost:3002 for real-time events.')
    .setVersion(apiVersion)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token (obtain from /auth/login)',
        in: 'header',
      },
      'JWT-auth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        description: 'API Key for external integrations',
        in: 'header',
      },
      'api-key',
    )
    .addServer('http://localhost:3001', 'Local Development')
    .addServer('https://api.cribseekers.com', 'Production')
    .addTag('auth', 'Authentication and authorization')
    .addTag('users', 'User management and profiles')
    .addTag('properties', 'Property listings and management')
    .addTag('inspections', 'Property inspection scheduling')
    .addTag('payments', 'Payment processing and transactions')
    .addTag('wallet', 'Digital wallet and transactions')
    .addTag('agents', 'Agent and agency management')
    .addTag('reviews', 'Reviews and ratings')
    .addTag('notifications', 'Push and in-app notifications')
    .addTag('chat', 'Real-time messaging and conversations')
    .addTag('storage', 'File upload and media management')
    .addTag('search', 'Property search and filtering')
    .addTag('recommendations', 'AI-powered property recommendations')
    .addTag('admin', 'Administrative operations')
    .addTag('health', 'Health checks and monitoring')
    .addTag('metrics', 'Prometheus metrics endpoint')
    .build();

  // Enable Swagger only in non-production or when explicitly enabled
  const enableSwagger = true; // Temporarily always enable for testing
  if (enableSwagger) {
    try {
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(`${apiPrefix}/v${apiVersion}/docs`, app, document, {
        swaggerOptions: {
          persistAuthorization: true,
          tagsSorter: 'alpha',
          operationsSorter: 'alpha',
        },
      });
      logger.log(`Swagger documentation: http://localhost:${port}/${apiPrefix}/v${apiVersion}/docs`);
    } catch (error) {
      logger.error('Failed to setup Swagger:', String(error));
    }
  }

  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}/${apiPrefix}/v${apiVersion}`);
}

bootstrap();
