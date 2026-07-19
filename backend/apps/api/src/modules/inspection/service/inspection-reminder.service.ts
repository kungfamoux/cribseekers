import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionReminderRepository } from '../repository/inspection-reminder.repository';
import { InspectionRepository } from '../repository/inspection.repository';
import { ReminderDto } from '../dto/reminder.dto';
import { InspectionReminderMapper } from '../mappers/inspection-reminder.mapper';
import { InspectionValidator } from '../validators/inspection.validator';

@Injectable()
export class InspectionReminderService {
  private readonly logger = new Logger(InspectionReminderService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly reminderRepository: InspectionReminderRepository,
        private readonly inspectionRepository: InspectionRepository,
  ) {}

  async createRemindersForInspection(inspectionId: string, method: string = 'EMAIL'): Promise<void> {
    this.logger.log(`Creating reminders for inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new Error('Inspection not found');
    }

    const reminderTimes = InspectionValidator.getReminderTimes(inspection.scheduledAt);

    for (const remindAt of reminderTimes) {
      const reminderData = InspectionReminderMapper.toCreateInput(inspectionId, inspection.requestedBy, remindAt, method);
      await this.reminderRepository.create(reminderData);
    }
  }

  async sendPendingReminders(): Promise<void> {
    this.logger.log('Sending pending reminders');

    const now = new Date();
    const pendingReminders = await this.reminderRepository.findPendingReminders(now);

    for (const reminder of pendingReminders.data) {
      await this.prisma.inspectionReminder.update({
        where: { id: reminder.id },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
      });
    }
  }

  async create(dto: ReminderDto): Promise<any> {
    this.logger.log(`Creating reminder for inspection ${dto.inspectionId}`);

    const reminderData = InspectionReminderMapper.toCreateInput(dto.inspectionId, dto.userId, dto.remindAt, dto.method);
    return this.reminderRepository.create(reminderData);
  }

  async findByInspectionId(inspectionId: string, options?: any): Promise<any> {
    return this.reminderRepository.findByInspectionId(inspectionId, options);
  }

  async findByUserId(userId: string, options?: any): Promise<any> {
    return this.reminderRepository.findByUserId(userId, options);
  }
}
