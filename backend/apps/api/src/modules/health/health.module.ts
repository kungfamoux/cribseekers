import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './indicators/redis.health';
import { DatabaseHealthIndicator } from '../../database/database.health';
import { BullMQHealthIndicator } from './indicators/bullmq.health';
import { StorageHealthIndicator } from './indicators/storage.health';
import { SystemHealthIndicator } from './indicators/system.health';
import { PrismaModule } from '../../database/prisma.module';
import { RedisModule } from '../../database/redis.module';
import { ConfigModule } from '../../config/config.module';
import { StorageModule } from '../storage/storage.module';
import { WorkersModule } from '../workers/workers.module';

@Module({
  imports: [TerminusModule, ConfigModule, PrismaModule, RedisModule, StorageModule, WorkersModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator, RedisHealthIndicator, BullMQHealthIndicator, StorageHealthIndicator, SystemHealthIndicator],
})
export class HealthModule {}
