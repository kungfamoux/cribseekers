import { HttpException, HttpStatus } from '@nestjs/common';

export class InspectionNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Inspection with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class InspectionAlreadyCancelledException extends HttpException {
  constructor(id: string) {
    super(`Inspection ${id} is already cancelled`, HttpStatus.BAD_REQUEST);
  }
}

export class InspectionAlreadyCompletedException extends HttpException {
  constructor(id: string) {
    super(`Inspection ${id} is already completed`, HttpStatus.BAD_REQUEST);
  }
}

export class InspectionConflictException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}

export class InspectionAlreadyConfirmedException extends HttpException {
  constructor(id: string) {
    super(`Inspection ${id} is already confirmed`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidInspectionStateException extends HttpException {
  constructor(currentStatus: string, newStatus: string) {
    super(`Cannot transition from ${currentStatus} to ${newStatus}`, HttpStatus.BAD_REQUEST);
  }
}

export class InspectionOTPExpiredException extends HttpException {
  constructor() {
    super('OTP has expired or maximum attempts reached', HttpStatus.BAD_REQUEST);
  }
}

export class InspectionQRCodeExpiredException extends HttpException {
  constructor() {
    super('QR code has expired or already used', HttpStatus.BAD_REQUEST);
  }
}

export class InspectionBookingWindowException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class InspectionParticipantExistsException extends HttpException {
  constructor(inspectionId: string, userId: string) {
    super(`User ${userId} is already a participant of inspection ${inspectionId}`, HttpStatus.CONFLICT);
  }
}

export class InspectionFeedbackNotAllowedException extends HttpException {
  constructor(id: string) {
    super(`Feedback not allowed for inspection ${id}`, HttpStatus.BAD_REQUEST);
  }
}

export class InspectionResultNotAllowedException extends HttpException {
  constructor(id: string) {
    super(`Result not allowed for inspection ${id}`, HttpStatus.BAD_REQUEST);
  }
}
