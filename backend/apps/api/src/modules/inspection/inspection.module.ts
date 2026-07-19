import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

import { InspectionController } from './controller/inspection.controller';
import { InspectionFeedbackController } from './controller/inspection-feedback.controller';
import { InspectionHistoryController } from './controller/inspection-history.controller';
import { InspectionQRCodeController } from './controller/inspection-qrcode.controller';
import { InspectionOTPController } from './controller/inspection-otp.controller';
import { InspectionReminderController } from './controller/inspection-reminder.controller';

import { InspectionService } from './service/inspection.service';
import { InspectionReminderService } from './service/inspection-reminder.service';
import { InspectionFeedbackService } from './service/inspection-feedback.service';
import { InspectionQRCodeService } from './service/inspection-qrcode.service';
import { InspectionOTPService } from './service/inspection-otp.service';
import { InspectionHistoryService } from './service/inspection-history.service';
import { InspectionResultService } from './service/inspection-result.service';
import { InspectionCancellationService } from './service/inspection-cancellation.service';

import { InspectionRepository } from './repository/inspection.repository';
import { InspectionScheduleRepository } from './repository/inspection-schedule.repository';
import { InspectionParticipantRepository } from './repository/inspection-participant.repository';
import { InspectionReminderRepository } from './repository/inspection-reminder.repository';
import { InspectionHistoryRepository } from './repository/inspection-history.repository';

@Module({
  imports: [PrismaModule],
  controllers: [
    InspectionController,
    InspectionFeedbackController,
    InspectionHistoryController,
    InspectionQRCodeController,
    InspectionOTPController,
    InspectionReminderController,
  ],
  providers: [
    InspectionService,
    InspectionReminderService,
    InspectionFeedbackService,
    InspectionQRCodeService,
    InspectionOTPService,
    InspectionHistoryService,
    InspectionResultService,
    InspectionCancellationService,
    InspectionRepository,
    InspectionScheduleRepository,
    InspectionParticipantRepository,
    InspectionReminderRepository,
    InspectionHistoryRepository,
  ],
  exports: [
    InspectionService,
    InspectionReminderService,
    InspectionFeedbackService,
    InspectionQRCodeService,
    InspectionOTPService,
    InspectionHistoryService,
    InspectionResultService,
    InspectionCancellationService,
  ],
})
export class InspectionModule {}
