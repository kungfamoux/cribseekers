import { ConflictException } from '@nestjs/common';

export class DuplicatePermissionException extends ConflictException {
  constructor(name: string) {
    super(`Permission with name ${name} already exists`);
  }
}
