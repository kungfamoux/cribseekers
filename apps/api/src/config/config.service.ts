import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

export type PrismaLogLevel = 'query' | 'info' | 'warn' | 'error';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get<T = any>(key: string): T {
    return this.configService.get<T>(key) as T;
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

  get databasePoolSize(): number | undefined {
    return this.getOptionalNumber('DATABASE_POOL_SIZE');
  }

  get databasePoolTimeout(): number | undefined {
    return this.getOptionalNumber('DATABASE_POOL_TIMEOUT');
  }

  get databaseHealthTimeout(): number {
    return this.getOptionalNumber('DATABASE_HEALTH_TIMEOUT_MS') || 3000;
  }

  get prismaLogLevels(): PrismaLogLevel[] {
    const raw = this.configService.get<string>('PRISMA_LOG_LEVELS');

    if (!raw) {
      return this.isDevelopment
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'];
    }

    return raw
      .split(',')
      .map((level) => level.trim())
      .filter((level): level is PrismaLogLevel =>
        ['query', 'info', 'warn', 'error'].includes(level),
      );
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

  private getOptionalNumber(key: string): number | undefined {
    const value = this.configService.get<string | number>(key);

    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
  }
}
