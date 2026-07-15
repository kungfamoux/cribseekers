import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IInspectionRepository } from '../interfaces/inspection.repository.interface';
import { InspectionStatus } from '@prisma/client';
import { InspectionValidator } from '../validators/inspection.validator';

@Injectable()
export class InspectionCancellationService {
  private readonly logger = new Logger(InspectionCancellationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly inspectionRepository: IInspectionRepository,
  ) {}

  async cancelInspection(inspectionId: string, reason: string, cancelledBy: string): Promise<any> {
    this.logger.log(`Cancelling inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new Error('Inspection not found');
    }

    if (inspection.status === InspectionStatus.CANCELLED) {
      throw new Error('Inspection already cancelled');
    }

    if (!InspectionValidator.isValidStatusTransition(inspection.status, InspectionStatus.CANCELLED)) {
      throw new Error('Cannot cancel inspection in current state');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.inspection.update({
        where: { id: inspectionId },
        data: {
          status: InspectionStatus.CANCELLED,
          cancelReason: reason,
          cancelledAt: new Date(),
        },
      });

      await tx.inspectionCancellation.create({
        data: {
          inspectionId,
          cancelledBy,
          reason,
          cancelledAt: new Date(),
        },
      });
    });

    return this.inspectionRepository.findById(inspectionId);
  }

  async findByInspectionId(inspectionId: string): Promise<any> {
    return this.prisma.inspectionCancellation.findFirst({
      where: { inspectionId },
    });
  }

  async findByCancelledBy(userId: string, options?: any): Promise<any> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;

    const [data, total] = await Promise.all([
      this.prisma.inspectionCancellation.findMany({
        where: { cancelledBy: userId },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.inspectionCancellation.count({ where: { cancelledBy: userId } }),
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
