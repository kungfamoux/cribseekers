import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isCurrency', async: false })
export class IsCurrencyConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;
    const currencyRegex = /^[A-Z]{3}$/;
    return currencyRegex.test(value);
  }

  defaultMessage() {
    return 'Invalid currency code format (must be 3-letter ISO code)';
  }
}

export function IsCurrency(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCurrencyConstraint,
    });
  };
}
