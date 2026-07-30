import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailVerificationNotFoundException extends HttpException {
  constructor() {
    super('Email verification not found', HttpStatus.NOT_FOUND);
  }
}

export class EmailVerificationExpiredException extends HttpException {
  constructor() {
    super('Email verification code has expired', HttpStatus.BAD_REQUEST);
  }
}

export class EmailVerificationInvalidException extends HttpException {
  constructor() {
    super('Invalid email verification code', HttpStatus.BAD_REQUEST);
  }
}

export class EmailVerificationAlreadyVerifiedException extends HttpException {
  constructor() {
    super('Email is already verified', HttpStatus.BAD_REQUEST);
  }
}

export class EmailVerificationRateLimitException extends HttpException {
  constructor() {
    super('Too many verification attempts. Please wait before trying again.', HttpStatus.TOO_MANY_REQUESTS);
  }
}
