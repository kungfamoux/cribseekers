import { NotFoundException } from '@nestjs/common';

export class PermissionNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Permission with identifier ${identifier} not found`);
  }
}
