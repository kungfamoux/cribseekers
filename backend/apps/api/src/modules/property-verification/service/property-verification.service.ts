import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyStatus } from '@prisma/client';
import { PropertyModerationRepository } from '../repository/property-moderation.repository';
import { PropertyHistoryRepository } from '../repository/property-history.repository';
import { SubmitPropertyDto } from '../dto/submit-property.dto';
import { ApprovePropertyDto } from '../dto/approve-property.dto';
import { RejectPropertyDto } from '../dto/reject-property.dto';
import { VerificationResponseDto } from '../dto/verification-response.dto';
import { VerificationHistoryDto } from '../dto/verification-history.dto';
import { PropertyModerationMapper } from '../mappers/property-moderation.mapper';
import { PropertyHistoryMapper } from '../mappers/property-history.mapper';
import { VerificationValidator } from '../validators/verification.validator';
import { PaginationResult } from '../../../common/types/pagination.type';
import {
  PropertyNotSubmittedException,
  PropertyAlreadyVerifiedException,
  PropertyAlreadyRejectedException,
  InvalidVerificationStateException,
  OwnershipVerificationFailedException,
} from '../exceptions/property-verification.exception';

@Injectable()
export class PropertyVerificationService {
  private readonly logger = new Logger(PropertyVerificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly moderationRepository: PropertyModerationRepository,
    private readonly historyRepository: PropertyHistoryRepository,
  ) {}

  async submitProperty(dto: SubmitPropertyDto, userId: string): Promise<VerificationResponseDto> {
    this.logger.log(`Submitting property ${dto.propertyId} for verification`);

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (property.status !== PropertyStatus.DRAFT) {
      throw new PropertyNotSubmittedException(dto.propertyId);
    }

    if (!VerificationValidator.isValidStatusTransition(property.status, PropertyStatus.SUBMITTED)) {
      throw new InvalidVerificationStateException(property.status, PropertyStatus.SUBMITTED);
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.property.update({
        where: { id: dto.propertyId },
        data: { status: PropertyStatus.SUBMITTED },
      });

      const moderation = PropertyModerationMapper.toCreateInput(dto.propertyId, 'PENDING');
      await tx.propertyModeration.create({ data: moderation });

      await this.createHistoryRecord(
        dto.propertyId,
        'SUBMITTED',
        { notes: dto.notes },
        userId,
        tx,
      );
    });

    const moderation = await this.moderationRepository.findByPropertyId(dto.propertyId);
    return PropertyModerationMapper.toResponseDto(moderation!);
  }

  async approveProperty(dto: ApprovePropertyDto, userId: string): Promise<VerificationResponseDto> {
    this.logger.log(`Approving property ${dto.propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (property.status === PropertyStatus.VERIFIED) {
      throw new PropertyAlreadyVerifiedException(dto.propertyId);
    }

    if (!VerificationValidator.canPropertyBeVerified(property.status)) {
      throw new InvalidVerificationStateException(property.status, PropertyStatus.VERIFIED);
    }

    await this.validateNigerianRequirements(dto.propertyId);

    await this.prisma.$transaction(async (tx: any) => {
      await tx.property.update({
        where: { id: dto.propertyId },
        data: {
          status: PropertyStatus.VERIFIED,
          verifiedAt: new Date(),
          verifiedBy: userId,
        },
      });

      const moderation = await tx.propertyModeration.findFirst({
        where: { propertyId: dto.propertyId },
      });

      if (moderation) {
        await tx.propertyModeration.update({
          where: { id: moderation.id },
          data: {
            status: 'APPROVED',
            reviewedBy: userId,
            reviewedAt: new Date(),
            notes: dto.notes,
          },
        });
      }

      await this.createHistoryRecord(
        dto.propertyId,
        'VERIFIED',
        { notes: dto.notes },
        userId,
        tx,
      );
    });

    const moderation = await this.moderationRepository.findByPropertyId(dto.propertyId);
    return PropertyModerationMapper.toResponseDto(moderation!);
  }

  async rejectProperty(dto: RejectPropertyDto, userId: string): Promise<VerificationResponseDto> {
    this.logger.log(`Rejecting property ${dto.propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (property.status === PropertyStatus.REJECTED) {
      throw new PropertyAlreadyRejectedException(dto.propertyId);
    }

    if (!VerificationValidator.canPropertyBeRejected(property.status)) {
      throw new InvalidVerificationStateException(property.status, PropertyStatus.REJECTED);
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.property.update({
        where: { id: dto.propertyId },
        data: { status: PropertyStatus.REJECTED },
      });

      const moderation = await tx.propertyModeration.findFirst({
        where: { propertyId: dto.propertyId },
      });

      if (moderation) {
        await tx.propertyModeration.update({
          where: { id: moderation.id },
          data: {
            status: 'REJECTED',
            reviewedBy: userId,
            reviewedAt: new Date(),
            rejectionReason: dto.rejectionReason,
            notes: dto.notes,
          },
        });
      }

      await this.createHistoryRecord(
        dto.propertyId,
        'REJECTED',
        { rejectionReason: dto.rejectionReason, notes: dto.notes },
        userId,
        tx,
      );
    });

    const moderation = await this.moderationRepository.findByPropertyId(dto.propertyId);
    return PropertyModerationMapper.toResponseDto(moderation!);
  }

  async getPropertyHistory(propertyId: string, options?: any): Promise<PaginationResult<VerificationHistoryDto>> {
    const result = await this.historyRepository.findByPropertyId(propertyId, options);
    return {
      data: result.data.map((h) => PropertyHistoryMapper.toResponseDto(h)),
      meta: result.meta,
    };
  }

  private async validateNigerianRequirements(propertyId: string): Promise<void> {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        location: true,
        ownership: true,
      },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (!property.location || !property.location.state || !property.location.city) {
      throw new OwnershipVerificationFailedException(
        propertyId,
        'Nigerian address, state, and city are required',
      );
    }

    if (!property.ownerId) {
      throw new OwnershipVerificationFailedException(propertyId, 'Owner is required');
    }

    const media = await this.prisma.propertyImage.findMany({
      where: { propertyId, status: 'APPROVED' },
    });

    if (media.length === 0) {
      throw new OwnershipVerificationFailedException(
        propertyId,
        'At least one approved image is required',
      );
    }

    const verifiedOwnership = property.ownership.find((o: any) => o.verified);
    if (!verifiedOwnership) {
      throw new OwnershipVerificationFailedException(
        propertyId,
        'Ownership verification must be completed',
      );
    }
  }

  private async createHistoryRecord(
    propertyId: string,
    action: string,
    changes: any,
    performedBy: string,
    transaction: any,
  ): Promise<void> {
    const historyData = PropertyHistoryMapper.toCreateInput({
      propertyId,
      action,
      changes,
      performedBy,
      performedAt: new Date(),
    });

    await transaction.propertyHistory.create({ data: historyData });
  }
}
