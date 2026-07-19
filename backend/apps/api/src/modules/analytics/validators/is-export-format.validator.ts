import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ANALYTICS_CONSTANTS } from '../constants/analytics.constants';

export function IsExportFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExportFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const validFormats = Object.values(ANALYTICS_CONSTANTS.EXPORT_FORMATS);
          return validFormats.includes(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return `Format must be one of: ${Object.values(ANALYTICS_CONSTANTS.EXPORT_FORMATS).join(', ')}`;
        },
      },
    });
  };
}
