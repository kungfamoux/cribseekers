import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RedisHealthIndicator } from './indicators/redis.health';
import { DatabaseHealthIndicator } from '../../database/database.health';
import { BullMQHealthIndicator } from './indicators/bullmq.health';
import { StorageHealthIndicator } from './indicators/storage.health';
import { SystemHealthIndicator } from './indicators/system.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private redisHealthIndicator: RedisHealthIndicator,
    private databaseHealthIndicator: DatabaseHealthIndicator,
    private bullMQHealthIndicator: BullMQHealthIndicator,
    private storageHealthIndicator: StorageHealthIndicator,
    private systemHealthIndicator: SystemHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.databaseHealthIndicator.isHealthy('database'),
      () => this.redisHealthIndicator.isHealthy('redis'),
      () => this.bullMQHealthIndicator.isHealthy('bullmq'),
      () => this.storageHealthIndicator.isHealthy('storage'),
      () => this.systemHealthIndicator.isHealthy('system'),
    ]);
  }

  @Get('live')
  @HealthCheck()
  live() {
    // Liveness probe - checks if the app is running
    return this.health.check([
      () => this.systemHealthIndicator.isHealthy('system'),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  ready() {
    // Readiness probe - checks if the app is ready to serve traffic
    return this.health.check([
      () => this.databaseHealthIndicator.isHealthy('database'),
      () => this.redisHealthIndicator.isHealthy('redis'),
      () => this.bullMQHealthIndicator.isHealthy('bullmq'),
    ]);
  }
}
