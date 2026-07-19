import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class BullMQHealthIndicator extends HealthIndicator {
  private readonly logger = new Logger(BullMQHealthIndicator.name);

  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    @InjectQueue('sms') private readonly smsQueue: Queue,
    @InjectQueue('push') private readonly pushQueue: Queue,
    @InjectQueue('image') private readonly imageQueue: Queue,
    @InjectQueue('video') private readonly videoQueue: Queue,
    @InjectQueue('property') private readonly propertyQueue: Queue,
    @InjectQueue('recommendation') private readonly recommendationQueue: Queue,
    @InjectQueue('analytics') private readonly analyticsQueue: Queue,
    @InjectQueue('report') private readonly reportQueue: Queue,
    @InjectQueue('settlement') private readonly settlementQueue: Queue,
    @InjectQueue('payment') private readonly paymentQueue: Queue,
    @InjectQueue('webhook') private readonly webhookQueue: Queue,
    @InjectQueue('search') private readonly searchQueue: Queue,
    @InjectQueue('inspection') private readonly inspectionQueue: Queue,
    @InjectQueue('cleanup') private readonly cleanupQueue: Queue,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const queues = [
        this.emailQueue,
        this.smsQueue,
        this.pushQueue,
        this.imageQueue,
        this.videoQueue,
        this.propertyQueue,
        this.recommendationQueue,
        this.analyticsQueue,
        this.reportQueue,
        this.settlementQueue,
        this.paymentQueue,
        this.webhookQueue,
        this.searchQueue,
        this.inspectionQueue,
        this.cleanupQueue,
      ];

      const results: any = {};
      let allHealthy = true;

      for (const queue of queues) {
        if (!queue) continue;

        try {
          const client = await queue.client;
          const isReady = client.status === 'ready';
          const jobCounts = await queue.getJobCounts();

          results[queue.name] = {
            status: isReady ? 'up' : 'down',
            waiting: jobCounts.waiting,
            active: jobCounts.active,
            completed: jobCounts.completed,
            failed: jobCounts.failed,
            delayed: jobCounts.delayed,
          };

          if (!isReady) {
            allHealthy = false;
          }
        } catch (error) {
          results[queue.name] = {
            status: 'down',
            error: error instanceof Error ? error.message : String(error),
          };
          allHealthy = false;
        }
      }

      return this.getStatus(key, allHealthy, {
        queues: results,
        totalQueues: queues.length,
        healthyQueues: Object.values(results).filter((r: any) => r.status === 'up').length,
      });
    } catch (error) {
      this.logger.error('BullMQ health check failed:', error);
      return this.getStatus(key, false, {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
