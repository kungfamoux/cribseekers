import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

export interface EmailJobData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Processor('email')
export class EmailQueueProcessor {
  private readonly logger = new Logger(EmailQueueProcessor.name);

  @Process('send')
  async handleSendEmail(job: Job<EmailJobData>) {
    this.logger.log(`Processing email job ${job.id}`);
    this.logger.log(`Sending email to ${job.data.to}`);
    
    // Email sending logic will be implemented here
    
    this.logger.log(`Email job ${job.id} completed`);
  }
}
