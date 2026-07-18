import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailQueueProcessor } from './processors/email.processor';
import { NotificationQueueProcessor } from './processors/notification.processor';
import { MediaQueueProcessor } from './processors/media.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    BullModule.registerQueue({ name: 'email' }),
    BullModule.registerQueue({ name: 'notification' }),
    BullModule.registerQueue({ name: 'sms' }),
    BullModule.registerQueue({ name: 'push' }),
    BullModule.registerQueue({ name: 'media' }),
    BullModule.registerQueue({ name: 'image' }),
    BullModule.registerQueue({ name: 'video' }),
    BullModule.registerQueue({ name: 'property' }),
    BullModule.registerQueue({ name: 'recommendation' }),
    BullModule.registerQueue({ name: 'analytics' }),
    BullModule.registerQueue({ name: 'report' }),
    BullModule.registerQueue({ name: 'settlement' }),
    BullModule.registerQueue({ name: 'payment' }),
    BullModule.registerQueue({ name: 'webhook' }),
    BullModule.registerQueue({ name: 'search' }),
    BullModule.registerQueue({ name: 'inspection' }),
    BullModule.registerQueue({ name: 'cleanup' }),
  ],
  providers: [EmailQueueProcessor, NotificationQueueProcessor, MediaQueueProcessor],
  exports: [BullModule],
})
export class WorkersModule {}
