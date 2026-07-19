import { Processor, Process, OnQueueActive, OnQueueCompleted, OnQueueFailed, OnQueueProgress } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

export interface MediaJobData {
  fileId: string;
  operation: 'resize' | 'compress' | 'thumbnail';
  options?: any;
  priority?: number;
}

@Processor('media')
export class MediaQueueProcessor {
  private readonly logger = new Logger(MediaQueueProcessor.name);

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing media job ${job.id}`);
    job.progress(10);
  }

  @OnQueueProgress()
  onProgress(job: Job, progress: number) {
    this.logger.debug(`Media job ${job.id} progress: ${progress}%`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Media job ${job.id} completed successfully`);
  }

  @OnQueueFailed()
  onFailed(job: Job, error: Error) {
    this.logger.error(`Media job ${job.id} failed: ${error.message}`);
  }

  @Process('process')
  async handleProcessMedia(job: Job<MediaJobData>) {
    try {
      this.logger.log(`Processing file ${job.data.fileId} with operation ${job.data.operation}`);
      job.progress(30);

      // Validate media data
      if (!job.data.fileId || !job.data.operation) {
        throw new Error('Invalid media data: missing required fields');
      }

      job.progress(50);

      // Media processing logic will be implemented here
      await this.simulateMediaProcessing(job);

      job.progress(100);

      this.logger.log(`Media job ${job.id} completed`);
      return { success: true, fileId: job.data.fileId, operation: job.data.operation };
    } catch (error) {
      this.logger.error(`Media job ${job.id} error:`, error);
      throw error;
    }
  }

  private async simulateMediaProcessing(job: Job<MediaJobData>): Promise<void> {
    // Simulate media processing delay
    await new Promise((resolve) => setTimeout(resolve, 200));
    job.progress(75);
  }
}
