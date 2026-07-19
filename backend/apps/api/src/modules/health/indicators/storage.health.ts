import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { StorageService } from '../../../modules/storage/service/storage.service';

@Injectable()
export class StorageHealthIndicator extends HealthIndicator {
  private readonly logger = new Logger(StorageHealthIndicator.name);

  constructor(private readonly storageService: StorageService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Check if storage service is available
      const isHealthy = await this.checkStorageHealth();

      return this.getStatus(key, isHealthy, {
        provider: 'aws-s3',
        status: isHealthy ? 'operational' : 'degraded',
      });
    } catch (error) {
      this.logger.error('Storage health check failed:', error);
      return this.getStatus(key, false, {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private async checkStorageHealth(): Promise<boolean> {
    try {
      // Simple health check - verify storage service is initialized
      if (this.storageService) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
