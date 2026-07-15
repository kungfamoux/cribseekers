import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { PropertyStatus } from '@prisma/client';
import { IPropertyModerationRepository } from '../interfaces/property-moderation.repository.interface';
import { ModerationActionDto, ModerationActionType } from '../dto/moderation-action.dto';
import { VerificationResponseDto } from '../dto/verification-response.dto';
import { PropertyModerationMapper } from '../mappers/property-moderation.mapper';
import { VerificationValidator } from '../validators/verification.validator';
import { PropertyModerationException } from '../exceptions/property-verification.exception';

@Injectable()
export class PropertyModerationService {
  private readonly logger = new Logger(PropertyModerationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly moderationRepository: IPropertyModerationRepository,
  ) {}

  async performModerationAction(dto: ModerationActionDto, userId: string): Promise<VerificationResponseDto> {
    this.logger.log(`Performing moderation action ${dto.action} on property ${dto.propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    switch (dto.action) {
      case ModerationActionType.SUSPEND:
        return this.suspendProperty(dto.propertyId, userId, dto.notes);
      case ModerationActionType.ARCHIVE:
        return this.archiveProperty(dto.propertyId, userId, dto.notes);
      case ModerationActionType.RESTORE:
        return this.restoreProperty(dto.propertyId, userId, dto.notes);
      case ModerationActionType.FLAG:
        return this.flagProperty(dto.propertyId, userId, dto.reason, dto.notes);
      case ModerationActionType.ESCALATE:
        return this.escalateProperty(dto.propertyId, userId, dto.notes);
      case ModerationActionType.REQUEST_DOCUMENTS:
        return this.requestDocuments(dto.propertyId, userId, dto.notes);
      default:
        throw new PropertyModerationException(`Unknown moderation action: ${dto.action}`);
    }
  }

  async suspendProperty(propertyId: string, userId: string, notes?: string): Promise<VerificationResponseDto> {
    this.logger.log(`Suspending property ${propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (!VerificationValidator.canPropertyBeSuspended(property.status)) {
      throw new PropertyModerationException(`Cannot suspend property with status ${property.status}`);
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.property.update({
        where: { id: propertyId },
        data: { status: PropertyStatus.UNPUBLISHED },
      });

      const moderation = await tx.propertyModeration.findFirst({
        where: { propertyId },
      });

      if (moderation) {
        await tx.propertyModeration.update({
          where: { id: moderation.id },
          data: {
            status: 'FLAGGED',
            reviewedBy: userId,
            reviewedAt: new Date(),
            notes,
          },
        });
      }

      await this.createHistoryRecord(propertyId, 'SUSPENDED', { notes }, userId, tx);
    });

    const moderation = await this.moderationRepository.findByPropertyId(propertyId);
    return PropertyModerationMapper.toResponseDto(moderation!);
  }

  async archiveProperty(propertyId: string, userId: string, notes?: string): Promise<VerificationResponseDto> {
    this.logger.log(`Archiving property ${propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (!VerificationValidator.canPropertyBeArchived(property.status)) {
      throw new PropertyModerationException(`Cannot archive property with status ${property.status}`);
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.property.update({
        where: { id: propertyId },
        data: { status: PropertyStatus.ARCHIVED },
      });

      await this.createHistoryRecord(propertyId, 'ARCHIVED', { notes }, userId, tx);
    });

    const moderation = await this.moderationRepository.findByPropertyId(propertyId);
    return PropertyModerationMapper.toResponseDto(moderation!);
  }

  async restoreProperty(propertyId: string, userId: string, notes?: string): Promise<VerificationResponseDto> {
    this.logger.log(`Restoring property ${propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (property.status !== PropertyStatus.ARCHIVED) {
      throw new PropertyModerationException(`Can only restore archived properties`);
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.property.update({
        where: { id: propertyId },
        data: { status: PropertyStatus.VERIFIED },
      });

      await this.createHistoryRecord(propertyId, 'RESTORED', { notes }, userId, tx);
    });

    const moderation = await this.moderationRepository.findByPropertyId(propertyId);
    return PropertyModerationMapper.toResponseDto(moderation!);
  }

  async flagProperty(propertyId: string, userId: string, reason?: string, notes?: string): Promise<VerificationResponseDto> {
    this.logger.log(`Flagging property ${propertyId}`);

    const moderation = await this.moderationRepository.findByPropertyId(propertyId);

    if (!moderation) {
      throw new Error('Moderation record not found');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.propertyModeration.update({
        where: { id: moderation.id },
        data: {
          status: 'FLAGGED',
          reviewedBy: userId,
          reviewedAt: new Date(),
          notes,
          rejectionReason: reason,
        },
      });

      await this.createHistoryRecord(propertyId, 'FLAGGED', { reason, notes }, userId, tx);
    });

    const updatedModeration = await this.moderationRepository.findByPropertyId(propertyId);
    return PropertyModerationMapper.toResponseDto(updatedModeration!);
  }

  async escalateProperty(propertyId: string, userId: string, notes?: string): Promise<VerificationResponseDto> {
    this.logger.log(`Escalating property ${propertyId}`);

    const moderation = await this.moderationRepository.findByPropertyId(propertyId);

    if (!moderation) {
      throw new Error('Moderation record not found');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.propertyModeration.update({
        where: { id: moderation.id },
        data: {
          notes: `${moderation.notes || ''} [ESCALATED]: ${notes || ''}`,
        },
      });

      await this.createHistoryRecord(propertyId, 'ESCALATED', { notes }, userId, tx);
    });

    const updatedModeration = await this.moderationRepository.findByPropertyId(propertyId);
    return PropertyModerationMapper.toResponseDto(updatedModeration!);
  }

  async requestDocuments(propertyId: string, userId: string, notes?: string): Promise<VerificationResponseDto> {
    this.logger.log(`Requesting documents for property ${propertyId}`);

    const moderation = await this.moderationRepository.findByPropertyId(propertyId);

    if (!moderation) {
      throw new Error('Moderation record not found');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.propertyModeration.update({
        where: { id: moderation.id },
        data: {
          notes: `${moderation.notes || ''} [DOCUMENTS_REQUESTED]: ${notes || ''}`,
        },
      });

      await this.createHistoryRecord(propertyId, 'DOCUMENTS_REQUESTED', { notes }, userId, tx);
    });

    const updatedModeration = await this.moderationRepository.findByPropertyId(propertyId);
    return PropertyModerationMapper.toResponseDto(updatedModeration!);
  }

  async getPendingModerations(_filter?: any, pagination?: any): Promise<any> {
    return this.moderationRepository.findByStatus('PENDING', pagination);
  }

  async getModerationsByReviewer(reviewerId: string, pagination?: any): Promise<any> {
    return this.moderationRepository.findByReviewer(reviewerId, pagination);
  }

  private async createHistoryRecord(
    propertyId: string,
    action: string,
    changes: any,
    performedBy: string,
    transaction: any,
  ): Promise<void> {
    const historyData = {
      propertyId,
      action,
      changes,
      performedBy,
      performedAt: new Date(),
    };

    await transaction.propertyHistory.create({ data: historyData });
  }
}
