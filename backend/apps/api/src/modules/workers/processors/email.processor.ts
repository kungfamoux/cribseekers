import { Processor, Process, OnQueueActive, OnQueueCompleted, OnQueueFailed, OnQueueProgress } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

export interface EmailJobData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  priority?: number;
  delay?: number;
}

@Processor('email')
export class EmailQueueProcessor {
  private readonly logger = new Logger(EmailQueueProcessor.name);

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing email job ${job.id}`);
    job.progress(10);
  }

  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    this.logger.debug(`Email job ${job.id} progress: ${progress}%`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Email job ${job.id} completed successfully`);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Email job ${job.id} failed: ${error.message}`);
  }

  @Process('send')
  async handleSendEmail(job: Job<EmailJobData>) {
    try {
      this.logger.log(`Sending email to ${job.data.to}`);
      job.progress(30);

      // Validate email data
      if (!job.data.to || !job.data.subject || !job.data.html) {
        throw new Error('Invalid email data: missing required fields');
      }

      job.progress(50);

      // Email sending logic will be implemented here
      // For now, simulate email sending
      await this.simulateEmailSending(job);

      job.progress(100);

      this.logger.log(`Email job ${job.id} completed`);
      return { success: true, to: job.data.to };
    } catch (error) {
      this.logger.error(`Email job ${job.id} error:`, error);
      throw error;
    }
  }

  private async simulateEmailSending(job: Job<EmailJobData>): Promise<void> {
    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    job.progress(75);
  }
}
