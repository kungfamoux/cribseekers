import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthCheckResult } from '@nestjs/terminus';
import { RedisService } from '../../../database/redis.service';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthCheckResult> {
    try {
      const client = this.redisService.getClient();
      await client.ping();
      return this.getStatus(key, true);
    } catch (error) {
      return this.getStatus(key, false, { error: error.message });
    }
  }
}
