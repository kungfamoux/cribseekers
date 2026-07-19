import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './modules/health/health.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { WorkersModule } from './modules/workers/workers.module';
import { IdentityModule } from './modules/identity/identity.module';
import { PropertyModule } from './modules/property/property.module';
import { PropertyVerificationModule } from './modules/property-verification/property-verification.module';
import { InspectionModule } from './modules/inspection/inspection.module';
import { PaymentModule } from './modules/payment/payment.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AdminModule } from './modules/admin/admin.module';
import { StorageModule } from './modules/storage/storage.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { SearchModule } from './modules/search/search.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';
import { TracingModule } from './infrastructure/tracing/tracing.module';
import { CacheModule } from './infrastructure/cache/cache.module';
import { RateLimitModule } from './infrastructure/rate-limit/rate-limit.module';
import { MetricsModule } from './infrastructure/metrics/metrics.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { AppController } from './app.controller';

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
    DatabaseModule,
    AppConfigModule,
    CommonModule,
    HealthModule,
    WorkersModule,
    IdentityModule,
    PropertyModule,
    PropertyVerificationModule,
    InspectionModule,
    PaymentModule,
    NotificationModule,
    AdminModule,
    StorageModule,
    CommunicationModule,
    RecommendationModule,
    SearchModule,
    TracingModule,
    CacheModule,
    RateLimitModule,
    MetricsModule,
    SchedulerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
