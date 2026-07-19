import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from './prisma.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await Promise.race([
        this.prisma.$queryRaw`SELECT 1`,
        this.timeout(),
      ]);

      return this.getStatus(key, true);
    } catch (error) {
      return this.getStatus(key, false, {
        error: error instanceof Error ? error.message : 'Database health check failed',
      });
    }
  }

  private timeout(): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error('Database health check timed out')),
        this.config.databaseHealthTimeout,
      );
    });
  }
}

