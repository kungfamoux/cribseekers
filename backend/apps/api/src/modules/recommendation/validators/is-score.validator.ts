import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';

@ValidatorConstraint({ name: 'isRecommendationScore', async: false })
export class IsRecommendationScoreConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'number') return false;
    return value >= RECOMMENDATION_CONSTANTS.MIN_SCORE && value <= RECOMMENDATION_CONSTANTS.MAX_SCORE;
  }

  defaultMessage() {
    return `Score must be between ${RECOMMENDATION_CONSTANTS.MIN_SCORE} and ${RECOMMENDATION_CONSTANTS.MAX_SCORE}`;
  }
}

export function IsRecommendationScore(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRecommendationScoreConstraint,
    });
  };
}
