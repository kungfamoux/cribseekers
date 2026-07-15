import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IInspectionRepository } from '../interfaces/inspection.repository.interface';
import { InspectionFeedbackDto } from '../dto/inspection-feedback.dto';
import { InspectionValidator } from '../validators/inspection.validator';
import { InspectionFeedbackNotAllowedException } from '../exceptions/inspection.exception';

@Injectable()
export class InspectionFeedbackService {
  private readonly logger = new Logger(InspectionFeedbackService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly inspectionRepository: IInspectionRepository,
  ) {}

  async submitFeedback(dto: InspectionFeedbackDto, userId: string): Promise<any> {
    this.logger.log(`Submitting feedback for inspection ${dto.inspectionId}`);

    const inspection = await this.inspectionRepository.findById(dto.inspectionId);
    if (!inspection) {
      throw new Error('Inspection not found');
    }

    if (!InspectionValidator.canProvideFeedback(inspection.status)) {
      throw new InspectionFeedbackNotAllowedException(dto.inspectionId);
    }

    if (!InspectionValidator.isRatingValid(dto.rating)) {
      throw new Error('Rating must be between 1 and 5');
    }

    const existingFeedback = await this.prisma.inspectionFeedback.findUnique({
      where: { inspectionId: dto.inspectionId },
    });

    if (existingFeedback) {
      throw new Error('Feedback already submitted for this inspection');
    }

    const feedback = await this.prisma.inspectionFeedback.create({
      data: {
        inspectionId: dto.inspectionId,
        userId,
        rating: dto.rating,
        comment: dto.comment,
      },
    });

    return feedback;
  }

  async findByInspectionId(inspectionId: string): Promise<any> {
    return this.prisma.inspectionFeedback.findUnique({
      where: { inspectionId },
    });
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;

    const [data, total] = await Promise.all([
      this.prisma.inspectionFeedback.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionFeedback.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
