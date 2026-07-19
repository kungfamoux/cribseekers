import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { COMMUNICATION_CONSTANTS } from '../constants/communication.constants';

@ValidatorConstraint({ name: 'isMessageLength', async: false })
export class IsMessageLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'string') return false;
    return value.length <= COMMUNICATION_CONSTANTS.MAX_MESSAGE_LENGTH;
  }

  defaultMessage() {
    return `Message content must not exceed ${COMMUNICATION_CONSTANTS.MAX_MESSAGE_LENGTH} characters`;
  }
}

export function IsMessageLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMessageLengthConstraint,
    });
  };
}
