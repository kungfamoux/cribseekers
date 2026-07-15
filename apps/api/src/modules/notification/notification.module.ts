import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

// Controllers
import { NotificationController } from './controller/notification.controller';
import { NotificationPreferenceController } from './controller/notification-preference.controller';
import { NotificationTemplateController } from './controller/notification-template.controller';
import { NotificationQueueController } from './controller/notification-queue.controller';
import { EmailNotificationController } from './controller/email-notification.controller';
import { SMSNotificationController } from './controller/sms-notification.controller';
import { PushSubscriptionController } from './controller/push-subscription.controller';

// Services
import { NotificationService } from './service/notification.service';
import { NotificationPreferenceService } from './service/notification-preference.service';
import { NotificationTemplateService } from './service/notification-template.service';
import { NotificationQueueService } from './service/notification-queue.service';
import { EmailNotificationService } from './service/email-notification.service';
import { SMSNotificationService } from './service/sms-notification.service';
import { PushNotificationService } from './service/push-notification.service';

// Repositories
import { NotificationRepository } from './repository/notification.repository';
import { NotificationPreferenceRepository } from './repository/notification-preference.repository';
import { NotificationTemplateRepository } from './repository/notification-template.repository';
import { NotificationQueueRepository } from './repository/notification-queue.repository';
import { EmailNotificationRepository } from './repository/email-notification.repository';
import { SMSNotificationRepository } from './repository/sms-notification.repository';
import { PushSubscriptionRepository } from './repository/push-subscription.repository';

// Providers
import { SMTPProvider } from './providers/smtp-provider';
import { TermiiProvider } from './providers/termii-provider';
import { FirebaseProvider } from './providers/firebase-provider';

@Module({
  controllers: [
    NotificationController,
    NotificationPreferenceController,
    NotificationTemplateController,
    NotificationQueueController,
    EmailNotificationController,
    SMSNotificationController,
    PushSubscriptionController,
  ],
  providers: [
    PrismaService,
    NotificationService,
    NotificationPreferenceService,
    NotificationTemplateService,
    NotificationQueueService,
    EmailNotificationService,
    SMSNotificationService,
    PushNotificationService,
    NotificationRepository,
    NotificationPreferenceRepository,
    NotificationTemplateRepository,
    NotificationQueueRepository,
    EmailNotificationRepository,
    SMSNotificationRepository,
    PushSubscriptionRepository,
    SMTPProvider,
    TermiiProvider,
    FirebaseProvider,
  ],
  exports: [
    NotificationService,
    NotificationPreferenceService,
    NotificationTemplateService,
    NotificationQueueService,
    EmailNotificationService,
    SMSNotificationService,
    PushNotificationService,
  ],
})
export class NotificationModule {}
