import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from '../../database/database.health';
import { StorageHealthIndicator } from './indicators/storage.health';
import { SystemHealthIndicator } from './indicators/system.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private databaseHealthIndicator: DatabaseHealthIndicator,
    private storageHealthIndicator: StorageHealthIndicator,
    private systemHealthIndicator: SystemHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.databaseHealthIndicator.isHealthy('database'),
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
    ]);
  }
}
