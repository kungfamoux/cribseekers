import { RecommendationFeedback } from '../types/recommendation-result.type';

export class RecommendationFeedbackEntity implements RecommendationFeedback {
  id: string;
  propertyId: string;
  userId: string;
  type: 'like' | 'dislike' | 'hide' | 'save';
  createdAt: Date;

  constructor(data: Partial<RecommendationFeedback>) {
    Object.assign(this, data);
  }
}
