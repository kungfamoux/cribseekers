import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { WorkersModule } from './modules/workers/workers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    TerminusModule,
    HealthModule,
    DatabaseModule,
    AppConfigModule,
    CommonModule,
    WorkersModule,
  ],
})
export class AppModule {}
