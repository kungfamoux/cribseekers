import { Injectable, Logger } from '@nestjs/common';
import { AuditLogRepository } from '../repository/audit-log.repository';
import { AuditLogMapper } from '../mappers/audit-log.mapper';
import { AuditLogNotFoundException } from '../exceptions/admin.exception';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly auditLogRepository: AuditLogRepository) {}

  async findById(id: string): Promise<any> {
    const auditLog = await this.auditLogRepository.findById(id);
    if (!auditLog) {
      throw new AuditLogNotFoundException(id);
    }
    return AuditLogMapper.toEntity(auditLog);
  }

  async findByActorId(actorId: string, options?: any): Promise<any> {
    return this.auditLogRepository.findByActorId(actorId, options);
  }

  async findByEntityType(entityType: string, entityId: string, options?: any): Promise<any> {
    return this.auditLogRepository.findByEntityType(entityType, entityId, options);
  }

  async findByAction(action: string, options?: any): Promise<any> {
    return this.auditLogRepository.findByAction(action, options);
  }

  async findByRequestId(requestId: string): Promise<any> {
    return this.auditLogRepository.findByRequestId(requestId);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.auditLogRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    const auditLog = await this.auditLogRepository.create(
      AuditLogMapper.toCreateInput(data),
    );
    this.logger.log(`Audit log created: ${auditLog.id}`);
    return AuditLogMapper.toEntity(auditLog);
  }
}
