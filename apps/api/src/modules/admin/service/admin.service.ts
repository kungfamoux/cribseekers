import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IAdminActionRepository } from '../interfaces/admin-action.repository.interface';
import { IAuditLogRepository } from '../interfaces/audit-log.repository.interface';
import { IActivityLogRepository } from '../interfaces/activity-log.repository.interface';
import { AdminActionMapper } from '../mappers/admin-action.mapper';
import { AuditLogMapper } from '../mappers/audit-log.mapper';
import { ActivityLogMapper } from '../mappers/activity-log.mapper';
import { AdminAccessDeniedException } from '../exceptions/admin.exception';
import { AdminValidator } from '../validators/admin.validator';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly adminActionRepository: IAdminActionRepository,
    private readonly auditLogRepository: IAuditLogRepository,
    private readonly activityLogRepository: IActivityLogRepository,
  ) {}

  async performAdminAction(
    adminId: string,
    adminRole: string,
    action: string,
    targetEntityType: string,
    targetEntityId: string,
    reason?: string,
    ipAddress?: string,
    userAgent?: string,
    requestId?: string,
  ): Promise<any> {
    if (!AdminValidator.canPerformAction(adminRole, 'SUPPORT_ADMIN')) {
      throw new AdminAccessDeniedException(action);
    }

    return this.prisma.$transaction(async (tx: any) => {
      const adminAction = await this.adminActionRepository
        .withTransaction(tx)
        .create(
          AdminActionMapper.toCreateInput({
            adminId,
            action,
            targetEntityType,
            targetEntityId,
            reason,
            outcome: 'SUCCESS',
            ipAddress,
            userAgent,
            requestId,
          }),
        );

      await this.auditLogRepository
        .withTransaction(tx)
        .create(
          AuditLogMapper.toCreateInput({
            actorId: adminId,
            actorType: 'ADMIN',
            action: action as any,
            entityType: targetEntityType,
            entityId: targetEntityId,
            changes: { reason },
            ipAddress,
            userAgent,
            requestId,
          }),
        );

      this.logger.log(`Admin action performed: ${action} on ${targetEntityType}:${targetEntityId} by ${adminId}`);
      return AdminActionMapper.toEntity(adminAction);
    });
  }

  async logActivity(
    userId: string | null,
    action: string,
    description: string,
    metadata?: any,
    ipAddress?: string,
    userAgent?: string,
    requestId?: string,
  ): Promise<any> {
    const activityLog = await this.activityLogRepository.create(
      ActivityLogMapper.toCreateInput({
        userId,
        action,
        description,
        metadata,
        ipAddress,
        userAgent,
        requestId,
      }),
    );

    this.logger.log(`Activity logged: ${action} by ${userId || 'anonymous'}`);
    return ActivityLogMapper.toEntity(activityLog);
  }

  async getAdminActions(
    adminId: string,
    options?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' },
  ): Promise<any> {
    return this.adminActionRepository.findByAdminId(adminId, options);
  }

  async getAuditLogs(
    filters?: any,
    options?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' },
  ): Promise<any> {
    return this.auditLogRepository.findAll(filters, options);
  }

  async getActivityLogs(
    filters?: any,
    options?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc' },
  ): Promise<any> {
    return this.activityLogRepository.findAll(filters, options);
  }
}
