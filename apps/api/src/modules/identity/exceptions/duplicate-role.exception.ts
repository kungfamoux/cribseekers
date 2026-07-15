import { ConflictException } from '@nestjs/common';

export class DuplicateRoleException extends ConflictException {
  constructor(name: string) {
    super(`Role with name ${name} already exists`);
  }
}
