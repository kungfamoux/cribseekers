import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IPropertyReportRepository } from '../interfaces/property-report.repository.interface';
import { PropertyReportDto } from '../dto/property-report.dto';
import { PropertyReportMapper } from '../mappers/property-report.mapper';
import { PropertyReportNotFoundException } from '../exceptions/property-verification.exception';
import { PaginationResult } from '../../../common/types/pagination.type';

@Injectable()
export class PropertyReportService {
  private readonly logger = new Logger(PropertyReportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reportRepository: IPropertyReportRepository,
  ) {}

  async reportProperty(dto: PropertyReportDto, userId: string): Promise<any> {
    this.logger.log(`User ${userId} reporting property ${dto.propertyId} for ${dto.reason}`);

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    const hasReported = await this.reportRepository.hasUserReportedProperty(dto.propertyId, userId);
    if (hasReported) {
      throw new Error('You have already reported this property');
    }

    const reportData = PropertyReportMapper.toCreateInput({
      propertyId: dto.propertyId,
      reportedBy: userId,
      reason: dto.reason,
      description: dto.description,
      status: 'PENDING',
    });

    const report = await this.reportRepository.create(reportData);
    return report;
  }

  async reviewReport(reportId: string, resolution: string, userId: string): Promise<any> {
    this.logger.log(`Reviewing report ${reportId}`);

    const report = await this.reportRepository.findById(reportId);
    if (!report) {
      throw new PropertyReportNotFoundException(reportId);
    }

    const updatedReport = await this.reportRepository.update(reportId, {
      status: 'RESOLVED',
      reviewedBy: userId,
      reviewedAt: new Date(),
      resolution,
    });

    return updatedReport;
  }

  async getPropertyReports(propertyId: string, options?: any): Promise<PaginationResult<any>> {
    return this.reportRepository.findByPropertyId(propertyId, options);
  }

  async getUserReports(userId: string, options?: any): Promise<PaginationResult<any>> {
    return this.reportRepository.findByReporter(userId, options);
  }

  async getPendingReports(options?: any): Promise<PaginationResult<any>> {
    return this.reportRepository.findByStatus('PENDING', options);
  }
}
