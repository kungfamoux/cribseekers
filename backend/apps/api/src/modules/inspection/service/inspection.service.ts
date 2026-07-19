import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionStatus } from '@prisma/client';
import { InspectionRepository } from '../repository/inspection.repository';
import { InspectionParticipantRepository } from '../repository/inspection-participant.repository';
import { InspectionHistoryRepository } from '../repository/inspection-history.repository';
import { CreateInspectionDto } from '../dto/create-inspection.dto';
import { InspectionMapper } from '../mappers/inspection.mapper';
import { InspectionScheduleMapper } from '../mappers/inspection-schedule.mapper';
import { InspectionParticipantMapper } from '../mappers/inspection-participant.mapper';
import { InspectionHistoryMapper } from '../mappers/inspection-history.mapper';
import { InspectionValidator } from '../validators/inspection.validator';
import {
  InspectionNotFoundException,
  InspectionAlreadyCancelledException,
  InspectionAlreadyCompletedException,
  InspectionConflictException,
  InspectionAlreadyConfirmedException,
  InvalidInspectionStateException,
  InspectionBookingWindowException,
  InspectionParticipantExistsException,
} from '../exceptions/inspection.exception';

@Injectable()
export class InspectionService {
  private readonly logger = new Logger(InspectionService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly inspectionRepository: InspectionRepository,
        private readonly participantRepository: InspectionParticipantRepository,
        private readonly historyRepository: InspectionHistoryRepository,
  ) {}

  async create(dto: CreateInspectionDto, userId: string): Promise<any> {
    this.logger.log(`Creating inspection for property ${dto.propertyId}`);

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    if (!InspectionValidator.canPropertyReceiveInspection(property.status)) {
      throw new Error('Property must be VERIFIED or PUBLISHED to receive inspections');
    }

    if (!InspectionValidator.isValidInspectionTime(dto.scheduledAt)) {
      throw new InspectionBookingWindowException('Invalid inspection time. Must be within working hours and booking window.');
    }

    const endTime = new Date(dto.scheduledAt.getTime() + (dto.durationMinutes || 30) * 60 * 1000);

    const existingInspections = await this.prisma.inspection.findMany({
      where: {
        propertyId: dto.propertyId,
        status: { in: ['REQUESTED', 'PENDING_CONFIRMATION', 'CONFIRMED'] },
        deletedAt: null,
      },
    });

    for (const existing of existingInspections) {
      if (InspectionValidator.hasTimeConflict(dto.scheduledAt, endTime, existing.scheduledAt, new Date(existing.scheduledAt.getTime() + (existing.durationMinutes || 30) * 60 * 1000))) {
        throw new InspectionConflictException('Time slot already booked for this property');
      }
    }

    await this.prisma.$transaction(async (tx: any) => {
      const inspectionData = InspectionMapper.toCreateInput(dto, userId);
      const inspection = await tx.inspection.create({ data: inspectionData });

      const scheduleData = InspectionScheduleMapper.toCreateInput(inspection.id, dto.scheduledAt, endTime);
      await tx.inspectionSchedule.create({ data: scheduleData });

      const historyData = InspectionHistoryMapper.toCreateInput(
        inspection.id,
        'CREATED',
        'REQUESTED',
        userId,
        'Inspection requested',
      );
      await tx.inspectionHistory.create({ data: historyData });

      return inspection;
    });

    const inspection = await this.inspectionRepository.findByPropertyId(dto.propertyId, { page: 1, limit: 1 });
    return inspection.data[0];
  }

  async confirm(inspectionId: string, userId: string): Promise<any> {
    this.logger.log(`Confirming inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new InspectionNotFoundException(inspectionId);
    }

    if (inspection.status === InspectionStatus.CONFIRMED) {
      throw new InspectionAlreadyConfirmedException(inspectionId);
    }

    if (!InspectionValidator.isValidStatusTransition(inspection.status, InspectionStatus.CONFIRMED)) {
      throw new InvalidInspectionStateException(inspection.status, 'CONFIRMED');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.inspection.update({
        where: { id: inspectionId },
        data: {
          status: InspectionStatus.CONFIRMED,
          confirmedBy: userId,
          confirmedAt: new Date(),
        },
      });

      const historyData = InspectionHistoryMapper.toCreateInput(
        inspectionId,
        'CONFIRMED',
        'CONFIRMED',
        userId,
        'Inspection confirmed',
      );
      await tx.inspectionHistory.create({ data: historyData });
    });

    return this.inspectionRepository.findById(inspectionId);
  }

  async cancel(inspectionId: string, reason: string, userId: string): Promise<any> {
    this.logger.log(`Cancelling inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new InspectionNotFoundException(inspectionId);
    }

    if (inspection.status === InspectionStatus.CANCELLED) {
      throw new InspectionAlreadyCancelledException(inspectionId);
    }

    if (inspection.status === InspectionStatus.COMPLETED) {
      throw new InspectionAlreadyCompletedException(inspectionId);
    }

    if (!InspectionValidator.isValidStatusTransition(inspection.status, InspectionStatus.CANCELLED)) {
      throw new InvalidInspectionStateException(inspection.status, 'CANCELLED');
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
          cancelledBy: userId,
          reason,
          cancelledAt: new Date(),
        },
      });

      const historyData = InspectionHistoryMapper.toCreateInput(
        inspectionId,
        'CANCELLED',
        'CANCELLED',
        userId,
        reason,
      );
      await tx.inspectionHistory.create({ data: historyData });
    });

    return this.inspectionRepository.findById(inspectionId);
  }

  async reschedule(inspectionId: string, newScheduledAt: Date, notes: string, userId: string): Promise<any> {
    this.logger.log(`Rescheduling inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new InspectionNotFoundException(inspectionId);
    }

    if (!InspectionValidator.isValidInspectionTime(newScheduledAt)) {
      throw new InspectionBookingWindowException('Invalid reschedule time. Must be within working hours and booking window.');
    }

    const oldInspectionId = inspectionId;

    await this.prisma.$transaction(async (tx: any) => {
      await tx.inspection.update({
        where: { id: inspectionId },
        data: {
          status: InspectionStatus.RESCHEDULED,
          rescheduledFrom: inspectionId,
        },
      });

      const newInspection = await tx.inspection.create({
        data: {
          propertyId: inspection.propertyId,
          type: inspection.type,
          status: InspectionStatus.REQUESTED,
          scheduledAt: newScheduledAt,
          durationMinutes: inspection.durationMinutes,
          notes: notes || inspection.notes,
          requestedBy: userId,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const endTime = new Date(newScheduledAt.getTime() + (inspection.durationMinutes || 30) * 60 * 1000);
      await tx.inspectionSchedule.create({
        data: {
          inspectionId: newInspection.id,
          startTime: newScheduledAt,
          endTime,
          isAvailable: true,
        },
      });

      const historyData = InspectionHistoryMapper.toCreateInput(
        newInspection.id,
        'RESCHEDULED',
        'REQUESTED',
        userId,
        notes,
      );
      await tx.inspectionHistory.create({ data: historyData });
    });

    return this.inspectionRepository.findById(oldInspectionId);
  }

  async addParticipant(inspectionId: string, userId: string, role: string, addedBy: string): Promise<any> {
    this.logger.log(`Adding participant ${userId} to inspection ${inspectionId}`);

    const existing = await this.participantRepository.findByInspectionAndUser(inspectionId, userId);
    if (existing) {
      throw new InspectionParticipantExistsException(inspectionId, userId);
    }

    const participantData = InspectionParticipantMapper.toCreateInput(inspectionId, userId, role);
    const participant = await this.participantRepository.create(participantData);

    const historyData = InspectionHistoryMapper.toCreateInput(
      inspectionId,
      'PARTICIPANT_ADDED',
      'REQUESTED',
      addedBy,
      `Added participant ${userId} as ${role}`,
    );
    await this.historyRepository.create(historyData);

    return participant;
  }

  async findById(id: string): Promise<any> {
    return this.inspectionRepository.findById(id);
  }

  async findByPropertyId(propertyId: string, options?: any): Promise<any> {
    return this.inspectionRepository.findByPropertyId(propertyId, options);
  }

  async findByRequestedBy(userId: string, options?: any): Promise<any> {
    return this.inspectionRepository.findByRequestedBy(userId, options);
  }
}
