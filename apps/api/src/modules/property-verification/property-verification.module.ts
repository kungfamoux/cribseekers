import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PropertyVerificationController } from './controller/property-verification.controller';
import { PropertyModerationController } from './controller/property-moderation.controller';
import { PropertyReportController } from './controller/property-report.controller';
import { PropertyVerificationService } from './service/property-verification.service';
import { PropertyModerationService } from './service/property-moderation.service';
import { PropertyReportService } from './service/property-report.service';
import { PropertyModerationRepository } from './repository/property-moderation.repository';
import { PropertyReportRepository } from './repository/property-report.repository';
import { PropertyHistoryRepository } from './repository/property-history.repository';

@Module({
  controllers: [
    PropertyVerificationController,
    PropertyModerationController,
    PropertyReportController,
  ],
  providers: [
    PrismaService,
    PropertyVerificationService,
    PropertyModerationService,
    PropertyReportService,
    PropertyModerationRepository,
    PropertyReportRepository,
    PropertyHistoryRepository,
  ],
  exports: [
    PropertyVerificationService,
    PropertyModerationService,
    PropertyReportService,
  ],
})
export class PropertyVerificationModule {}
