import { Injectable, Logger } from '@nestjs/common';
import { InspectionHistoryRepository } from '../repository/inspection-history.repository';
import { InspectionHistoryDto } from '../dto/inspection-history.dto';
import { InspectionHistoryMapper } from '../mappers/inspection-history.mapper';

@Injectable()
export class InspectionHistoryService {
  private readonly logger = new Logger(InspectionHistoryService.name);

  constructor(
    private readonly historyRepository: InspectionHistoryRepository,
  ) {}

  async findByInspectionId(inspectionId: string, options?: any): Promise<any> {
    this.logger.log(`Getting history for inspection ${inspectionId}`);

    const result = await this.historyRepository.findByInspectionId(inspectionId, options);
    return {
      data: result.data.map((h) => InspectionHistoryMapper.toDto(h)),
      meta: result.meta,
    };
  }

  async findByPerformedBy(userId: string, options?: any): Promise<any> {
    this.logger.log(`Getting history performed by user ${userId}`);

    const result = await this.historyRepository.findByPerformedBy(userId, options);
    return {
      data: result.data.map((h) => InspectionHistoryMapper.toDto(h)),
      meta: result.meta,
    };
  }

  async create(inspectionId: string, action: string, newState: string, performedBy: string, notes?: string): Promise<InspectionHistoryDto> {
    this.logger.log(`Creating history record for inspection ${inspectionId}`);

    const historyData = InspectionHistoryMapper.toCreateInput(inspectionId, action, newState, performedBy, notes);
    const history = await this.historyRepository.create(historyData);
    return InspectionHistoryMapper.toDto(history);
  }
}
