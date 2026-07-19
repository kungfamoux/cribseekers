import { HttpException, HttpStatus } from '@nestjs/common';

export class SearchException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class InvalidRadiusException extends HttpException {
  constructor(radius: number) {
    super(`Invalid search radius: ${radius}. Radius must be between 0.1 and 100 kilometers`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidCoordinatesException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class SearchNotFoundException extends HttpException {
  constructor(query: string) {
    super(`No search results found for query: ${query}`, HttpStatus.NOT_FOUND);
  }
}

export class InvalidSearchFilterException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
