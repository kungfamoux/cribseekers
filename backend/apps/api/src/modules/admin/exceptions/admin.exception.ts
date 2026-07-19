import { HttpException, HttpStatus } from '@nestjs/common';

export class AdminAccessDeniedException extends HttpException {
  constructor(action: string) {
    super(`Access denied: ${action} requires higher privileges`, HttpStatus.FORBIDDEN);
  }
}

export class AuditLogNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Audit log not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

export class ActivityLogNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Activity log not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

export class ReportNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Report not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateSystemSettingException extends HttpException {
  constructor(key: string) {
    super(`System setting already exists: ${key}`, HttpStatus.CONFLICT);
  }
}

export class FeatureFlagNotFoundException extends HttpException {
  constructor(key: string) {
    super(`Feature flag not found: ${key}`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateFeatureFlagException extends HttpException {
  constructor(key: string) {
    super(`Feature flag already exists: ${key}`, HttpStatus.CONFLICT);
  }
}

export class ApiKeyNotFoundException extends HttpException {
  constructor(id: string) {
    super(`API key not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateApiKeyException extends HttpException {
  constructor(key: string) {
    super(`API key already exists: ${key}`, HttpStatus.CONFLICT);
  }
}

export class WebhookNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Webhook not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateWebhookException extends HttpException {
  constructor(url: string) {
    super(`Webhook already exists: ${url}`, HttpStatus.CONFLICT);
  }
}

export class BackgroundJobNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Background job not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

export class SystemSettingValidationException extends HttpException {
  constructor(message: string) {
    super(`System setting validation failed: ${message}`, HttpStatus.BAD_REQUEST);
  }
}
