import { Processor, Process, OnQueueActive, OnQueueCompleted, OnQueueFailed, OnQueueProgress } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

export interface NotificationJobData {
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  priority?: number;
}

@Processor('notification')
export class NotificationQueueProcessor {
  private readonly logger = new Logger(NotificationQueueProcessor.name);

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing notification job ${job.id}`);
    job.progress(10);
  }

  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    this.logger.debug(`Notification job ${job.id} progress: ${progress}%`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Notification job ${job.id} completed successfully`);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Notification job ${job.id} failed: ${error.message}`);
  }

  @Process('send')
  async handleSendNotification(job: Job<NotificationJobData>) {
    try {
      this.logger.log(`Sending notification to user ${job.data.userId}`);
      job.progress(30);

      // Validate notification data
      if (!job.data.userId || !job.data.type || !job.data.title || !job.data.message) {
        throw new Error('Invalid notification data: missing required fields');
      }

      job.progress(50);

      // Notification sending logic will be implemented here
      await this.simulateNotificationSending(job);

      job.progress(100);

      this.logger.log(`Notification job ${job.id} completed`);
      return { success: true, userId: job.data.userId, type: job.data.type };
    } catch (error) {
      this.logger.error(`Notification job ${job.id} error:`, error);
      throw error;
    }
  }

  private async simulateNotificationSending(job: Job<NotificationJobData>): Promise<void> {
    // Simulate notification sending delay
    await new Promise((resolve) => setTimeout(resolve, 50));
    job.progress(75);
  }
}
