import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionRepository } from '../repository/inspection.repository';
import { InspectionResultDto } from '../dto/inspection-result.dto';
import { InspectionValidator } from '../validators/inspection.validator';
import { InspectionResultNotAllowedException } from '../exceptions/inspection.exception';

@Injectable()
export class InspectionResultService {
  private readonly logger = new Logger(InspectionResultService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly inspectionRepository: InspectionRepository,
  ) {}

  async recordResult(dto: InspectionResultDto, completedBy: string): Promise<any> {
    this.logger.log(`Recording result for inspection ${dto.inspectionId}`);

    const inspection = await this.inspectionRepository.findById(dto.inspectionId);
    if (!inspection) {
      throw new Error('Inspection not found');
    }

    if (!InspectionValidator.canProvideResult(inspection.status)) {
      throw new InspectionResultNotAllowedException(dto.inspectionId);
    }

    const existingResult = await this.prisma.inspectionResult.findUnique({
      where: { inspectionId: dto.inspectionId },
    });

    if (existingResult) {
      throw new Error('Result already recorded for this inspection');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.inspectionResult.create({
        data: {
          inspectionId: dto.inspectionId,
          status: dto.status,
          notes: dto.notes,
          photos: dto.photos || [],
          completedBy,
          completedAt: new Date(),
        },
      });

      await tx.inspection.update({
        where: { id: dto.inspectionId },
        data: {
          result: dto.status,
          resultNotes: dto.notes,
          completedBy,
          completedAt: new Date(),
        },
      });
    });

    return this.prisma.inspectionResult.findUnique({
      where: { inspectionId: dto.inspectionId },
    });
  }

  async findByInspectionId(inspectionId: string): Promise<any> {
    return this.prisma.inspectionResult.findUnique({
      where: { inspectionId },
    });
  }

  async findByStatus(status: string, options?: any): Promise<any> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;

    const [data, total] = await Promise.all([
      this.prisma.inspectionResult.findMany({
        where: { status: status as any },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionResult.count({ where: { status: status as any } }),
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
