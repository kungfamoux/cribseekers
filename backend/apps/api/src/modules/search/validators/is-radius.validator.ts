import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SEARCH_CONSTANTS } from '../constants/search.constants';

@ValidatorConstraint({ name: 'isSearchRadius', async: false })
export class IsSearchRadiusConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number') return false;
    return value >= SEARCH_CONSTANTS.MIN_SEARCH_RADIUS && value <= SEARCH_CONSTANTS.MAX_SEARCH_RADIUS;
  }

  defaultMessage() {
    return `Radius must be between ${SEARCH_CONSTANTS.MIN_SEARCH_RADIUS} and ${SEARCH_CONSTANTS.MAX_SEARCH_RADIUS} kilometers`;
  }
}

export function IsSearchRadius(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSearchRadiusConstraint,
    });
  };
}
