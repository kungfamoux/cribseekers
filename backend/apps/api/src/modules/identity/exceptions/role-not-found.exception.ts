import { NotFoundException } from '@nestjs/common';

export class RoleNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Role with identifier ${identifier} not found`);
  }
}
