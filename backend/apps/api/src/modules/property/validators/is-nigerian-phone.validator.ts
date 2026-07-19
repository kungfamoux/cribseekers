import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isNigerianPhone', async: false })
export class IsNigerianPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;
    const phoneRegex = /^(\+234|0)[789]\d{9}$/;
    return phoneRegex.test(value);
  }

  defaultMessage() {
    return 'Invalid Nigerian phone number format';
  }
}

export function IsNigerianPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNigerianPhoneConstraint,
    });
  };
}
