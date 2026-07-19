import { Injectable } from '@nestjs/common';
import { RECOMMENDATION_CONSTANTS } from '../constants/recommendation.constants';
import { RecommendationReason } from '../types/recommendation-result.type';

@Injectable()
export class RecommendationEngineService {
  private weights = { ...RECOMMENDATION_CONSTANTS.DEFAULT_WEIGHTS };

  setWeights(weights: Partial<typeof RECOMMENDATION_CONSTANTS.DEFAULT_WEIGHTS>): void {
    this.weights = { ...this.weights, ...weights };
  }

  getWeights(): typeof RECOMMENDATION_CONSTANTS.DEFAULT_WEIGHTS {
    return { ...this.weights };
  }

  calculateScore(property: any, userPreferences?: any): number {
    let score = 0;

    // Location score
    if (property.location) {
      score += this.weights.location * 100;
    }

    // Price similarity (normalized)
    score += this.weights.priceSimilarity * 50;

    // Property type match
    if (userPreferences?.preferredTypes?.includes(property.typeId)) {
      score += this.weights.propertyType * 100;
    } else {
      score += this.weights.propertyType * 50;
    }

    // Purpose match
    if (userPreferences?.preferredPurposes?.includes(property.purposeId)) {
      score += this.weights.purpose * 100;
    } else {
      score += this.weights.purpose * 50;
    }

    // Bedrooms
    if (property.bedrooms) {
      score += this.weights.bedrooms * Math.min(property.bedrooms / 5, 1) * 100;
    }

    // Bathrooms
    if (property.bathrooms) {
      score += this.weights.bathrooms * Math.min(property.bathrooms / 3, 1) * 100;
    }

    // Verification status
    if (property.verifiedAt) {
      score += this.weights.verificationStatus * 100;
    }

    // Featured status
    if (property.featured) {
      score += this.weights.featuredStatus * 100;
    }

    // Popularity (views)
    score += this.weights.popularity * Math.min(property.views / 1000, 1) * 100;

    // Freshness (recency)
    if (property.publishedAt) {
      const daysSincePublished = (Date.now() - property.publishedAt.getTime()) / (1000 * 60 * 60 * 24);
      score += this.weights.freshness * Math.max(0, 1 - daysSincePublished / 30) * 100;
    }

    // Recency (recently added)
    if (property.createdAt) {
      const daysSinceCreated = (Date.now() - property.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      score += this.weights.recency * Math.max(0, 1 - daysSinceCreated / 7) * 100;
    }

    return Math.min(Math.round(score), RECOMMENDATION_CONSTANTS.MAX_SCORE);
  }

  generateReasons(property: any, _score: number): RecommendationReason[] {
    const reasons: RecommendationReason[] = [];

    if (property.featured) {
      reasons.push({
        type: 'featured',
        description: 'Featured listing',
        weight: this.weights.featuredStatus,
        contribution: this.weights.featuredStatus * 100,
      });
    }

    if (property.verifiedAt) {
      reasons.push({
        type: 'verified',
        description: 'Verified property',
        weight: this.weights.verificationStatus,
        contribution: this.weights.verificationStatus * 100,
      });
    }

    if (property.views > 100) {
      reasons.push({
        type: 'popular',
        description: `Popular (${property.views} views)`,
        weight: this.weights.popularity,
        contribution: this.weights.popularity * Math.min(property.views / 1000, 1) * 100,
      });
    }

    if (property.publishedAt) {
      const daysSincePublished = (Date.now() - property.publishedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePublished < 7) {
        reasons.push({
          type: 'fresh',
          description: 'Recently listed',
          weight: this.weights.freshness,
          contribution: this.weights.freshness * Math.max(0, 1 - daysSincePublished / 30) * 100,
        });
      }
    }

    if (property.bedrooms && property.bedrooms >= 3) {
      reasons.push({
        type: 'amenities',
        description: `${property.bedrooms} bedrooms`,
        weight: this.weights.bedrooms,
        contribution: this.weights.bedrooms * Math.min(property.bedrooms / 5, 1) * 100,
      });
    }

    return reasons;
  }
}
