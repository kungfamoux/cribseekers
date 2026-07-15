import { InspectionStatus, PropertyStatus } from '@prisma/client';

export class InspectionValidator {
  private static readonly MIN_BOOKING_NOTICE_HOURS = 24;
  private static readonly MAX_FUTURE_BOOKING_DAYS = 60;
  private static readonly WORKING_HOURS_START = 8;
  private static readonly WORKING_HOURS_END = 18;
  private static readonly MAX_OTP_ATTEMPTS = 5;
  private static readonly QR_CODE_EXPIRY_MINUTES = 30;
  private static readonly OTP_EXPIRY_MINUTES = 10;

  static isValidStatusTransition(currentStatus: InspectionStatus, newStatus: InspectionStatus): boolean {
    const validTransitions: Record<InspectionStatus, InspectionStatus[]> = {
      REQUESTED: ['PENDING_CONFIRMATION', 'CANCELLED', 'EXPIRED'],
      PENDING_CONFIRMATION: ['CONFIRMED', 'CANCELLED', 'RESCHEDULED'],
      CONFIRMED: ['COMPLETED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW'],
      RESCHEDULED: ['PENDING_CONFIRMATION', 'CANCELLED'],
      COMPLETED: [],
      CANCELLED: [],
      NO_SHOW: [],
      EXPIRED: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }

  static canPropertyReceiveInspection(propertyStatus: PropertyStatus): boolean {
    return propertyStatus === PropertyStatus.VERIFIED || propertyStatus === PropertyStatus.PUBLISHED;
  }

  static isWithinBookingWindow(scheduledAt: Date): boolean {
    const now = new Date();
    const minDate = new Date(now.getTime() + this.MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000);
    const maxDate = new Date(now.getTime() + this.MAX_FUTURE_BOOKING_DAYS * 24 * 60 * 60 * 1000);

    return scheduledAt >= minDate && scheduledAt <= maxDate;
  }

  static isWorkingDay(date: Date): boolean {
    const day = date.getDay();
    return day >= 1 && day <= 6;
  }

  static isWorkingHours(date: Date): boolean {
    const hours = date.getHours();
    return hours >= this.WORKING_HOURS_START && hours < this.WORKING_HOURS_END;
  }

  static isNigerianHoliday(date: Date): boolean {
    const month = date.getMonth();
    const day = date.getDate();

    const holidays = [
      { month: 0, day: 1 },
      { month: 0, day: 26 },
      { month: 3, day: 15 },
      { month: 4, day: 1 },
      { month: 5, day: 12 },
      { month: 9, day: 1 },
      { month: 11, day: 25 },
    ];

    return holidays.some((holiday) => holiday.month === month && holiday.day === day);
  }

  static isValidInspectionTime(scheduledAt: Date): boolean {
    if (!this.isWithinBookingWindow(scheduledAt)) {
      return false;
    }

    if (!this.isWorkingDay(scheduledAt)) {
      return false;
    }

    if (this.isNigerianHoliday(scheduledAt)) {
      return false;
    }

    if (!this.isWorkingHours(scheduledAt)) {
      return false;
    }

    return true;
  }

  static hasTimeConflict(startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date): boolean {
    return startTime1 < endTime2 && endTime1 > startTime2;
  }

  static isOTPValid(expiresAt: Date, attemptCount: number): boolean {
    const now = new Date();
    if (now > expiresAt) {
      return false;
    }

    if (attemptCount >= this.MAX_OTP_ATTEMPTS) {
      return false;
    }

    return true;
  }

  static isQRCodeValid(expiresAt: Date, usedAt: Date | null): boolean {
    const now = new Date();
    if (now > expiresAt) {
      return false;
    }

    if (usedAt) {
      return false;
    }

    return true;
  }

  static isRatingValid(rating: number): boolean {
    return rating >= 1 && rating <= 5;
  }

  static canProvideFeedback(status: InspectionStatus): boolean {
    return status === InspectionStatus.COMPLETED;
  }

  static canProvideResult(status: InspectionStatus): boolean {
    return status === InspectionStatus.COMPLETED;
  }

  static getQRCodeExpiry(): Date {
    return new Date(Date.now() + this.QR_CODE_EXPIRY_MINUTES * 60 * 1000);
  }

  static getOTPExpiry(): Date {
    return new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);
  }

  static getReminderTimes(scheduledAt: Date): Date[] {
    const reminders: Date[] = [];
    const hours24 = 24 * 60 * 60 * 1000;
    const hours2 = 2 * 60 * 60 * 1000;
    const minutes30 = 30 * 60 * 1000;

    reminders.push(new Date(scheduledAt.getTime() - hours24));
    reminders.push(new Date(scheduledAt.getTime() - hours2));
    reminders.push(new Date(scheduledAt.getTime() - minutes30));

    return reminders.filter((date) => date > new Date());
  }
}
