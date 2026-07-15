import { HttpException, HttpStatus } from '@nestjs/common';

export class PropertyNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Property with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class PropertyAlreadyExistsException extends HttpException {
  constructor(title: string) {
    super(`Property with title "${title}" already exists`, HttpStatus.CONFLICT);
  }
}

export class PropertyStatusException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyDeletedException extends HttpException {
  constructor(id: string) {
    super(`Property with ID ${id} is deleted and cannot be modified`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyNotPublishedException extends HttpException {
  constructor(id: string) {
    super(`Property with ID ${id} is not published`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyExpiredException extends HttpException {
  constructor(id: string) {
    super(`Property with ID ${id} has expired`, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyOwnershipException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class PropertyValidationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyMediaException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class PropertyLocationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
