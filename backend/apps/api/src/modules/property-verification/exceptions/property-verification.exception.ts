import { HttpException, HttpStatus } from '@nestjs/common';

export class PropertyNotSubmittedException extends HttpException {
  constructor(propertyId: string) {
    super(`Property ${propertyId} has not been submitted for verification`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyAlreadyVerifiedException extends HttpException {
  constructor(propertyId: string) {
    super(`Property ${propertyId} is already verified`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyAlreadyRejectedException extends HttpException {
  constructor(propertyId: string) {
    super(`Property ${propertyId} has already been rejected`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyAlreadyPublishedException extends HttpException {
  constructor(propertyId: string) {
    super(`Property ${propertyId} is already published`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidVerificationStateException extends HttpException {
  constructor(currentStatus: string, targetStatus: string) {
    super(`Cannot transition from ${currentStatus} to ${targetStatus}`, HttpStatus.BAD_REQUEST);
  }
}

export class OwnershipVerificationFailedException extends HttpException {
  constructor(propertyId: string, reason: string) {
    super(`Ownership verification failed for property ${propertyId}: ${reason}`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyModerationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class VerificationAssignmentException extends HttpException {
  constructor(propertyId: string, reason: string) {
    super(`Failed to assign verification for property ${propertyId}: ${reason}`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyReportNotFoundException extends HttpException {
  constructor(reportId: string) {
    super(`Property report ${reportId} not found`, HttpStatus.NOT_FOUND);
  }
}
