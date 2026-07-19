import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export function mapPrismaException(error: unknown): Error {
  if (error instanceof PrismaClientKnownRequestError) {
    return mapKnownRequestError(error);
  }

  if (error instanceof PrismaClientValidationError) {
    return new BadRequestException('Invalid database query');
  }

  if (error instanceof PrismaClientInitializationError) {
    return new ServiceUnavailableException('Database is unavailable');
  }

  if (error instanceof PrismaClientRustPanicError) {
    return new ServiceUnavailableException('Database engine failure');
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return new InternalServerErrorException('Unexpected database error');
  }

  return error instanceof Error
    ? error
    : new InternalServerErrorException('Unexpected database error');
}

function mapKnownRequestError(error: PrismaClientKnownRequestError): Error {
  switch (error.code) {
    case 'P2000':
      return new BadRequestException('Input value is too long');
    case 'P2002':
      return new ConflictException('A record with this value already exists');
    case 'P2003':
      return new BadRequestException('Invalid related record reference');
    case 'P2025':
      return new NotFoundException('Record not found');
    case 'P2024':
      return new RequestTimeoutException('Database connection timed out');
    default:
      return new InternalServerErrorException('Database operation failed');
  }
}
