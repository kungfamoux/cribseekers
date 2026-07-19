import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isRecommendationWeight', async: false })
export class IsRecommendationWeightConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number') return false;
    return value >= 0 && value <= 1;
  }

  defaultMessage() {
    return 'Weight must be between 0 and 1';
  }
}

export function IsRecommendationWeight(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRecommendationWeightConstraint,
    });
  };
}
