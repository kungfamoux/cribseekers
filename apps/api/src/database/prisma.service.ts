import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from '../common/logger/logger.service';
import { ConfigService, PrismaLogLevel } from '../config/config.service';

interface PrismaQueryEvent {
  readonly duration: number;
}

interface PrismaLogEvent {
  readonly message: string;
}

interface PrismaLogDefinition {
  readonly emit: 'event';
  readonly level: PrismaLogLevel;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    super({
      datasources: {
        db: {
          url: buildDatabaseUrl(config),
        },
      },
      errorFormat: config.isProduction ? 'minimal' : 'pretty',
      log: getPrismaLogConfig(config),
    });

    this.registerPrismaLogHandlers();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Database connection established', PrismaService.name);
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Database connection closed', PrismaService.name);
  }

  async cleanDatabase(): Promise<void | unknown[]> {
    if (process.env.NODE_ENV === 'production') return;

    const models = Reflect.ownKeys(this).filter(
      (key) => typeof key === 'string' && key[0] !== '_' && key !== 'constructor',
    );

    return Promise.all(
      models.map((modelKey) => (this as any)[modelKey].deleteMany()),
    );
  }

  private registerPrismaLogHandlers(): void {
    this.$on('query' as never, (event: PrismaQueryEvent) => {
      if (this.config.isDevelopment) {
        this.logger.debug(
          `Query executed in ${event.duration}ms`,
          PrismaService.name,
        );
      }
    });

    this.$on('error' as never, (event: PrismaLogEvent) => {
      this.logger.error(event.message, undefined, PrismaService.name);
    });

    this.$on('warn' as never, (event: PrismaLogEvent) => {
      this.logger.warn(event.message, PrismaService.name);
    });
  }
}

function getPrismaLogConfig(config: ConfigService): PrismaLogDefinition[] {
  const levels = config.prismaLogLevels;

  return levels.map((level) => ({
    emit: 'event',
    level,
  }));
}

function buildDatabaseUrl(config: ConfigService): string {
  const databaseUrl = config.databaseUrl;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  const poolSize = config.databasePoolSize;
  const poolTimeout = config.databasePoolTimeout;

  if (!poolSize && !poolTimeout) {
    return databaseUrl;
  }

  const url = new URL(databaseUrl);

  if (poolSize) {
    url.searchParams.set('connection_limit', String(poolSize));
  }

  if (poolTimeout) {
    url.searchParams.set('pool_timeout', String(poolTimeout));
  }

  return url.toString();
}
