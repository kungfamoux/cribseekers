import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDateRange', async: false })
export class IsDateRangeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'object' || value === null) {
      return false;
    }
    
    const { startDate, endDate } = value as any;
    
    if (!startDate || !endDate) {
      return false;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }
    
    return start <= end;
  }

  defaultMessage() {
    return 'Invalid date range: startDate must be before or equal to endDate';
  }
}

export function IsDateRange(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateRangeConstraint,
    });
  };
}
