import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { SEARCH_CONSTANTS } from '../constants/search.constants';

@ValidatorConstraint({ name: 'isLatitude', async: false })
export class IsLatitudeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number') return false;
    return value >= SEARCH_CONSTANTS.MIN_LATITUDE && value <= SEARCH_CONSTANTS.MAX_LATITUDE;
  }

  defaultMessage() {
    return `Latitude must be between ${SEARCH_CONSTANTS.MIN_LATITUDE} and ${SEARCH_CONSTANTS.MAX_LATITUDE}`;
  }
}

@ValidatorConstraint({ name: 'isLongitude', async: false })
export class IsLongitudeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number') return false;
    return value >= SEARCH_CONSTANTS.MIN_LONGITUDE && value <= SEARCH_CONSTANTS.MAX_LONGITUDE;
  }

  defaultMessage() {
    return `Longitude must be between ${SEARCH_CONSTANTS.MIN_LONGITUDE} and ${SEARCH_CONSTANTS.MAX_LONGITUDE}`;
  }
}

export function IsLatitude(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLatitudeConstraint,
    });
  };
}

export function IsLongitude(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLongitudeConstraint,
    });
  };
}
