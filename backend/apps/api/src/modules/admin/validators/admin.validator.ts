import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isUUID } from 'class-validator';

@ValidatorConstraint({ name: 'isValidUUID', async: false })
export class IsValidUUID implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return isUUID(value);
  }

  defaultMessage(): string {
    return 'Invalid UUID format';
  }
}

@ValidatorConstraint({ name: 'isValidFeatureFlagPercentage', async: false })
export class IsValidFeatureFlagPercentage implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === 'number' && value >= 0 && value <= 100;
  }

  defaultMessage(): string {
    return 'Percentage must be between 0 and 100';
  }
}

@ValidatorConstraint({ name: 'isValidWebhookUrl', async: false })
export class IsValidWebhookUrl implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid webhook URL';
  }
}

@ValidatorConstraint({ name: 'isValidApiKeyScope', async: false })
export class IsValidApiKeyScope implements ValidatorConstraintInterface {
  private readonly validScopes = [
    'read',
    'write',
    'admin',
    'properties',
    'users',
    'payments',
    'inspections',
    'reports',
  ];

  validate(value: any): boolean {
    if (Array.isArray(value)) {
      return value.every((scope) => this.validScopes.includes(scope));
    }
    return this.validScopes.includes(value);
  }

  defaultMessage(): string {
    return `Invalid API key scope. Valid scopes are: ${this.validScopes.join(', ')}`;
  }
}

@ValidatorConstraint({ name: 'isValidJobPriority', async: false })
export class IsValidJobPriority implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === 'number' && value >= 0 && value <= 100;
  }

  defaultMessage(): string {
    return 'Job priority must be between 0 and 100';
  }
}

@ValidatorConstraint({ name: 'isValidReportStatus', async: false })
export class IsValidReportStatus implements ValidatorConstraintInterface {
  private readonly validStatuses = ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

  validate(value: any): boolean {
    return this.validStatuses.includes(value);
  }

  defaultMessage(): string {
    return `Invalid report status. Valid statuses are: ${this.validStatuses.join(', ')}`;
  }
}

@ValidatorConstraint({ name: 'isValidReportCategory', async: false })
export class IsValidReportCategory implements ValidatorConstraintInterface {
  private readonly validCategories = [
    'PROPERTY',
    'USER',
    'AGENT',
    'LANDLORD',
    'PAYMENT',
    'INSPECTION',
    'FRAUD',
    'SPAM',
    'OTHER',
  ];

  validate(value: any): boolean {
    return this.validCategories.includes(value);
  }

  defaultMessage(): string {
    return `Invalid report category. Valid categories are: ${this.validCategories.join(', ')}`;
  }
}

@ValidatorConstraint({ name: 'isValidSystemSettingKey', async: false })
export class IsValidSystemSettingKey implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === 'string' && /^[a-z0-9_.-]+$/.test(value);
  }

  defaultMessage(): string {
    return 'System setting key must contain only lowercase letters, numbers, dots, hyphens, and underscores';
  }
}

@ValidatorConstraint({ name: 'isValidSystemSettingType', async: false })
export class IsValidSystemSettingType implements ValidatorConstraintInterface {
  private readonly validTypes = ['STRING', 'NUMBER', 'BOOLEAN', 'JSON'];

  validate(value: any): boolean {
    return this.validTypes.includes(value);
  }

  defaultMessage(): string {
    return `Invalid system setting type. Valid types are: ${this.validTypes.join(', ')}`;
  }
}

@ValidatorConstraint({ name: 'isValidNigerianPhone', async: false })
export class IsValidNigerianPhone implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    return phoneRegex.test(value);
  }

  defaultMessage(): string {
    return 'Invalid Nigerian phone number format';
  }
}

export class AdminValidator {
  static isValidUUID(value: string): boolean {
    return isUUID(value);
  }

  static isValidFeatureFlagPercentage(value: number): boolean {
    return typeof value === 'number' && value >= 0 && value <= 100;
  }

  static isValidWebhookUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static isValidApiKeyScope(value: string | string[]): boolean {
    const validScopes = [
      'read',
      'write',
      'admin',
      'properties',
      'users',
      'payments',
      'inspections',
      'reports',
    ];
    if (Array.isArray(value)) {
      return value.every((scope) => validScopes.includes(scope));
    }
    return validScopes.includes(value);
  }

  static isValidJobPriority(value: number): boolean {
    return typeof value === 'number' && value >= 0 && value <= 100;
  }

  static isValidReportStatus(value: string): boolean {
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
    return validStatuses.includes(value);
  }

  static isValidReportCategory(value: string): boolean {
    const validCategories = [
      'PROPERTY',
      'USER',
      'AGENT',
      'LANDLORD',
      'PAYMENT',
      'INSPECTION',
      'FRAUD',
      'SPAM',
      'OTHER',
    ];
    return validCategories.includes(value);
  }

  static isValidSystemSettingKey(value: string): boolean {
    return typeof value === 'string' && /^[a-z0-9_.-]+$/.test(value);
  }

  static isValidSystemSettingType(value: string): boolean {
    const validTypes = ['STRING', 'NUMBER', 'BOOLEAN', 'JSON'];
    return validTypes.includes(value);
  }

  static isValidNigerianPhone(value: string): boolean {
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    return phoneRegex.test(value);
  }

  static canPerformAction(adminRole: string, requiredRole: string): boolean {
    const roleHierarchy: Record<string, number> = {
      SUPER_ADMIN: 3,
      SUPPORT_ADMIN: 2,
      MODERATOR: 1,
    };
    return (roleHierarchy[adminRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  }
}
