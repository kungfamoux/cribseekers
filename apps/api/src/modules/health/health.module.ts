import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { RedisHealthIndicator } from './indicators/redis.health';
import { DatabaseHealthIndicator } from '../../database/database.health';
import { PrismaModule } from '../../database/prisma.module';
import { RedisModule } from '../../database/redis.module';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [TerminusModule, ConfigModule, PrismaModule, RedisModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicator, RedisHealthIndicator],
})
export class HealthModule {}
