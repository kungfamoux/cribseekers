import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidDateRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDateRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_value: any, args: ValidationArguments) {
          const { startDate, endDate } = args.object as any;
          
          if (!startDate || !endDate) {
            return false;
          }

          const start = new Date(startDate);
          const end = new Date(endDate);

          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return false;
          }

          return start <= end;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Start date must be before end date and both must be valid dates';
        },
      },
    });
  };
}
