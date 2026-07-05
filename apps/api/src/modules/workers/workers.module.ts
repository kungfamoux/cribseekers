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
    BullModule.registerQueue({
      name: 'email',
    }),
    BullModule.registerQueue({
      name: 'notification',
    }),
    BullModule.registerQueue({
      name: 'media',
    }),
  ],
  providers: [EmailQueueProcessor, NotificationQueueProcessor, MediaQueueProcessor],
  exports: [BullModule],
})
export class WorkersModule {}
