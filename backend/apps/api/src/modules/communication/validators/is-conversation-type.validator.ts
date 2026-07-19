import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ConversationType } from '@prisma/client';

@ValidatorConstraint({ name: 'isConversationType', async: false })
export class IsConversationTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return Object.values(ConversationType).includes(value);
  }

  defaultMessage() {
    return 'Invalid conversation type';
  }
}

export function IsConversationType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsConversationTypeConstraint,
    });
  };
}
