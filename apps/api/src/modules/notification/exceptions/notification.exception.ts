import { HttpException, HttpStatus } from '@nestjs/common';

export class NotificationNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Notification with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class NotificationPreferenceNotFoundException extends HttpException {
  constructor(userId: string) {
    super(`Notification preference for user ${userId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class NotificationTemplateNotFoundException extends HttpException {
  constructor(idOrName: string) {
    super(`Notification template ${idOrName} not found`, HttpStatus.NOT_FOUND);
  }
}

export class DuplicateTemplateException extends HttpException {
  constructor(name: string) {
    super(`Notification template with name ${name} already exists`, HttpStatus.CONFLICT);
  }
}

export class NotificationQueueException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class EmailDeliveryException extends HttpException {
  constructor(message: string) {
    super(`Email delivery failed: ${message}`, HttpStatus.BAD_GATEWAY);
  }
}

export class SMSDeliveryException extends HttpException {
  constructor(message: string) {
    super(`SMS delivery failed: ${message}`, HttpStatus.BAD_GATEWAY);
  }
}

export class PushDeliveryException extends HttpException {
  constructor(message: string) {
    super(`Push notification delivery failed: ${message}`, HttpStatus.BAD_GATEWAY);
  }
}

export class NotificationExpiredException extends HttpException {
  constructor(id: string) {
    super(`Notification ${id} has expired`, HttpStatus.GONE);
  }
}

export class DuplicatePushSubscriptionException extends HttpException {
  constructor(endpoint: string) {
    super(`Push subscription with endpoint ${endpoint} already exists`, HttpStatus.CONFLICT);
  }
}

export class InvalidNotificationChannelException extends HttpException {
  constructor(channel: string) {
    super(`Invalid notification channel: ${channel}`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidNotificationTypeException extends HttpException {
  constructor(type: string) {
    super(`Invalid notification type: ${type}`, HttpStatus.BAD_REQUEST);
  }
}

export class QuietHoursViolationException extends HttpException {
  constructor() {
    super('Cannot send notification during quiet hours', HttpStatus.FORBIDDEN);
  }
}

export class MaxRetriesExceededException extends HttpException {
  constructor(id: string) {
    super(`Notification ${id} exceeded maximum retry attempts`, HttpStatus.BAD_REQUEST);
  }
}
