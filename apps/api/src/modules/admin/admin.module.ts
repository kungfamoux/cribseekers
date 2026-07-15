import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

// Controllers
import { AdminController } from './controller/admin.controller';
import { AuditController } from './controller/audit.controller';
import { ActivityController } from './controller/activity.controller';
import { ReportController } from './controller/report.controller';
import { SystemSettingController } from './controller/system-setting.controller';
import { FeatureFlagController } from './controller/feature-flag.controller';
import { ApiKeyController } from './controller/api-key.controller';
import { WebhookController } from './controller/webhook.controller';
import { BackgroundJobController } from './controller/background-job.controller';

// Services
import { AdminService } from './service/admin.service';
import { AuditService } from './service/audit.service';
import { ActivityService } from './service/activity.service';
import { ReportService } from './service/report.service';
import { SystemSettingService } from './service/system-setting.service';
import { FeatureFlagService } from './service/feature-flag.service';
import { ApiKeyService } from './service/api-key.service';
import { WebhookService } from './service/webhook.service';
import { BackgroundJobService } from './service/background-job.service';

// Repositories
import { AuditLogRepository } from './repository/audit-log.repository';
import { ActivityLogRepository } from './repository/activity-log.repository';
import { AdminActionRepository } from './repository/admin-action.repository';
import { ReportRepository } from './repository/report.repository';
import { ReportCategoryRepository } from './repository/report-category.repository';
import { SystemSettingRepository } from './repository/system-setting.repository';
import { FeatureFlagRepository } from './repository/feature-flag.repository';
import { ApiKeyRepository } from './repository/api-key.repository';
import { WebhookRepository } from './repository/webhook.repository';
import { WebhookDeliveryRepository } from './repository/webhook-delivery.repository';
import { BackgroundJobRepository } from './repository/background-job.repository';

@Module({
  controllers: [
    AdminController,
    AuditController,
    ActivityController,
    ReportController,
    SystemSettingController,
    FeatureFlagController,
    ApiKeyController,
    WebhookController,
    BackgroundJobController,
  ],
  providers: [
    PrismaService,
    AdminService,
    AuditService,
    ActivityService,
    ReportService,
    SystemSettingService,
    FeatureFlagService,
    ApiKeyService,
    WebhookService,
    BackgroundJobService,
    AuditLogRepository,
    ActivityLogRepository,
    AdminActionRepository,
    ReportRepository,
    ReportCategoryRepository,
    SystemSettingRepository,
    FeatureFlagRepository,
    ApiKeyRepository,
    WebhookRepository,
    WebhookDeliveryRepository,
    BackgroundJobRepository,
  ],
  exports: [
    AdminService,
    AuditService,
    ActivityService,
    ReportService,
    SystemSettingService,
    FeatureFlagService,
    ApiKeyService,
    WebhookService,
    BackgroundJobService,
  ],
})
export class AdminModule {}
