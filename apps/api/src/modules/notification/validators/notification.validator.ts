import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isUUID, isEmail } from 'class-validator';
import { NotificationType, NotificationChannel, NotificationStatus, PriorityLevel } from '@prisma/client';

@ValidatorConstraint({ name: 'isValidNotificationType', async: false })
export class IsValidNotificationType implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return Object.values(NotificationType).includes(value);
  }

  defaultMessage(): string {
    return 'Invalid notification type';
  }
}

@ValidatorConstraint({ name: 'isValidNotificationChannel', async: false })
export class IsValidNotificationChannel implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return Object.values(NotificationChannel).includes(value);
  }

  defaultMessage(): string {
    return 'Invalid notification channel';
  }
}

@ValidatorConstraint({ name: 'isValidNotificationStatus', async: false })
export class IsValidNotificationStatus implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return Object.values(NotificationStatus).includes(value);
  }

  defaultMessage(): string {
    return 'Invalid notification status';
  }
}

@ValidatorConstraint({ name: 'isValidPriorityLevel', async: false })
export class IsValidPriorityLevel implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return Object.values(PriorityLevel).includes(value);
  }

  defaultMessage(): string {
    return 'Invalid priority level';
  }
}

@ValidatorConstraint({ name: 'isValidTemplateVariable', async: false })
export class IsValidTemplateVariable implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const variablePattern = /^\{\{[a-zA-Z][a-zA-Z0-9_]*\}\}$/;
    return variablePattern.test(value);
  }

  defaultMessage(): string {
    return 'Invalid template variable format. Use {{variableName}} format';
  }
}

@ValidatorConstraint({ name: 'isValidPushEndpoint', async: false })
export class IsValidPushEndpoint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid push endpoint URL. Must be a valid HTTPS URL';
  }
}

export class NotificationValidator {
  static isValidUUID(value: string): boolean {
    return isUUID(value);
  }

  static isValidEmail(value: string): boolean {
    return isEmail(value);
  }

  static isValidNigerianPhone(value: string): boolean {
    const nigerianPhonePattern = /^(\+234|0)?[789][01]\d{8}$/;
    return nigerianPhonePattern.test(value);
  }

  static isValidTimezone(value: string): boolean {
    return value === 'Africa/Lagos';
  }

  static isValidQuietHours(start?: string, end?: string): boolean {
    if (!start || !end) return true;
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    return startHour >= 0 && startHour <= 23 && endHour >= 0 && endHour <= 23;
  }

  static isWithinQuietHours(currentHour: number, quietStart?: string, quietEnd?: string): boolean {
    if (!quietStart || !quietEnd) return false;
    const startHour = parseInt(quietStart.split(':')[0]);
    const endHour = parseInt(quietEnd.split(':')[0]);
    
    if (startHour < endHour) {
      return currentHour >= startHour && currentHour < endHour;
    } else {
      return currentHour >= startHour || currentHour < endHour;
    }
  }

  static isNotificationExpired(expiresAt?: Date): boolean {
    if (!expiresAt) return false;
    return new Date() > expiresAt;
  }

  static canRetryNotification(attempts: number, maxAttempts: number): boolean {
    return attempts < maxAttempts;
  }

  static isValidTemplateVariables(variables: string[]): boolean {
    const variablePattern = /^\{\{[a-zA-Z][a-zA-Z0-9_]*\}\}$/;
    return variables.every(v => variablePattern.test(v));
  }

  static substituteVariables(template: string, variables: Record<string, any>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(pattern, String(value));
    }
    return result;
  }
}
