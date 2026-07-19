import { Injectable, Logger } from '@nestjs/common';
import { ActivityLogRepository } from '../repository/activity-log.repository';
import { ActivityLogMapper } from '../mappers/activity-log.mapper';
import { ActivityLogNotFoundException } from '../exceptions/admin.exception';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async findById(id: string): Promise<any> {
    const activityLog = await this.activityLogRepository.findById(id);
    if (!activityLog) {
      throw new ActivityLogNotFoundException(id);
    }
    return ActivityLogMapper.toEntity(activityLog);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.activityLogRepository.findByUserId(userId, options);
  }

  async findByAction(action: string, options?: any): Promise<any> {
    return this.activityLogRepository.findByAction(action, options);
  }

  async findByRequestId(requestId: string): Promise<any> {
    return this.activityLogRepository.findByRequestId(requestId);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.activityLogRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    const activityLog = await this.activityLogRepository.create(
      ActivityLogMapper.toCreateInput(data),
    );
    this.logger.log(`Activity log created: ${activityLog.id}`);
    return ActivityLogMapper.toEntity(activityLog);
  }
}
