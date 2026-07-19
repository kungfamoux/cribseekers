import { HttpException, HttpStatus } from '@nestjs/common';

export class RecommendationException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class RecommendationNotFoundException extends HttpException {
  constructor(resource: string) {
    super(`Recommendation not found: ${resource}`, HttpStatus.NOT_FOUND);
  }
}

export class RecommendationStrategyException extends HttpException {
  constructor(strategy: string, message: string) {
    super(`Recommendation strategy '${strategy}' failed: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class RecommendationFeedbackException extends HttpException {
  constructor(message: string) {
    super(`Failed to process recommendation feedback: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidRecommendationRequestException extends HttpException {
  constructor(message: string) {
    super(`Invalid recommendation request: ${message}`, HttpStatus.BAD_REQUEST);
  }
}
