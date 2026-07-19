import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DatabaseHealthIndicator } from '../../database/database.health';
import { StorageHealthIndicator } from './indicators/storage.health';
import { SystemHealthIndicator } from './indicators/system.health';
import { PrismaModule } from '../../database/prisma.module';
import { ConfigModule } from '../../config/config.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TerminusModule, ConfigModule, PrismaModule, StorageModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator, StorageHealthIndicator, SystemHealthIndicator],
})
export class HealthModule {}
