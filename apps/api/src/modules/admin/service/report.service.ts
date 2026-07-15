import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IReportRepository } from '../interfaces/report.repository.interface';
import { ReportMapper } from '../mappers/report.mapper';
import { ReportNotFoundException } from '../exceptions/admin.exception';

@Injectable()
export class ReportService {
  private readonly logger = new Logger(ReportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reportRepository: IReportRepository,
  ) {}

  async findById(id: string): Promise<any> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new ReportNotFoundException(id);
    }
    return ReportMapper.toEntity(report);
  }

  async findByCategory(categoryId: string, options?: any): Promise<any> {
    return this.reportRepository.findByCategory(categoryId, options);
  }

  async findByReportedBy(reportedBy: string, options?: any): Promise<any> {
    return this.reportRepository.findByReportedBy(reportedBy, options);
  }

  async findByEntity(entityType: string, entityId: string, options?: any): Promise<any> {
    return this.reportRepository.findByEntity(entityType, entityId, options);
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    return this.reportRepository.findByStatus(status, options);
  }

  async findByAssignedTo(assignedTo: string, options?: any): Promise<any> {
    return this.reportRepository.findByAssignedTo(assignedTo, options);
  }

  async findAll(filters?: any, options?: any): Promise<any> {
    return this.reportRepository.findAll(filters, options);
  }

  async create(data: any): Promise<any> {
    return this.prisma.$transaction(async (tx: any) => {
      const report = await this.reportRepository
        .withTransaction(tx)
        .create(ReportMapper.toCreateInput(data));
      this.logger.log(`Report created: ${report.id}`);
      return ReportMapper.toEntity(report);
    });
  }

  async updateStatus(id: string, data: any): Promise<any> {
    return this.prisma.$transaction(async (tx: any) => {
      const report = await this.reportRepository
        .withTransaction(tx)
        .update(id, ReportMapper.toUpdateInput(data));
      this.logger.log(`Report status updated: ${id} to ${data.status}`);
      return ReportMapper.toEntity(report);
    });
  }
}
