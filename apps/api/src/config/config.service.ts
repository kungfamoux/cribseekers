import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get<T = any>(key: string): T {
    return this.configService.get<T>(key);
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') || 'development';
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 3001;
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX') || 'api/v1';
  }

  get apiVersion(): string {
    return this.configService.get<string>('API_VERSION') || '1.0.0';
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL') || '';
  }

  get redisHost(): string {
    return this.configService.get<string>('REDIS_HOST') || 'localhost';
  }

  get redisPort(): number {
    return this.configService.get<number>('REDIS_PORT') || 6379;
  }

  get redisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD') || '';
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || '';
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN') || '7d';
  }

  get corsOrigin(): string {
    return this.configService.get<string>('CORS_ORIGIN') || '*';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }
}
