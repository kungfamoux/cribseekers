import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { COMMUNICATION_CONSTANTS } from '../constants/communication.constants';

@ValidatorConstraint({ name: 'isAttachmentCount', async: false })
export class IsAttachmentCountConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!Array.isArray(value)) return false;
    return value.length <= COMMUNICATION_CONSTANTS.MAX_ATTACHMENTS_PER_MESSAGE;
  }

  defaultMessage() {
    return `Message cannot have more than ${COMMUNICATION_CONSTANTS.MAX_ATTACHMENTS_PER_MESSAGE} attachments`;
  }
}

export function IsAttachmentCount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAttachmentCountConstraint,
    });
  };
}
