import { RecommendationItem, RecommendationReason, RecommendationExplanation, RecommendationFactor } from '../types/recommendation-result.type';
import { RecommendationItemDto, RecommendationReasonDto } from '../dto/recommendation-response.dto';
import { RecommendationExplanationDto, RecommendationFactorDto } from '../dto/recommendation-explanation.dto';

export class RecommendationMapper {
  static toItemDto(entity: RecommendationItem): RecommendationItemDto {
    const dto = new RecommendationItemDto();
    dto.propertyId = entity.propertyId;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.price = entity.price;
    dto.currency = entity.currency;
    dto.pricePeriod = entity.pricePeriod;
    dto.categoryId = entity.categoryId;
    dto.typeId = entity.typeId;
    dto.purposeId = entity.purposeId;
    dto.locationId = entity.locationId;
    dto.state = entity.state;
    dto.city = entity.city;
    dto.lga = entity.lga;
    dto.district = entity.district;
    dto.estate = entity.estate;
    dto.bedrooms = entity.bedrooms;
    dto.bathrooms = entity.bathrooms;
    dto.squareFeet = entity.squareFeet;
    dto.squareMeters = entity.squareMeters;
    dto.status = entity.status;
    dto.featured = entity.featured;
    dto.verified = entity.verified;
    dto.views = entity.views;
    dto.publishedAt = entity.publishedAt;
    dto.distance = entity.distance;
    dto.thumbnailUrl = entity.thumbnailUrl;
    dto.score = entity.score;
    dto.reasons = entity.reasons.map(r => this.toReasonDto(r));
    return dto;
  }

  static toReasonDto(reason: RecommendationReason): RecommendationReasonDto {
    const dto = new RecommendationReasonDto();
    dto.type = reason.type;
    dto.description = reason.description;
    dto.weight = reason.weight;
    dto.contribution = reason.contribution;
    return dto;
  }

  static toExplanationDto(explanation: RecommendationExplanation): RecommendationExplanationDto {
    const dto = new RecommendationExplanationDto();
    dto.propertyId = explanation.propertyId;
    dto.score = explanation.score;
    dto.factors = explanation.factors.map(f => this.toFactorDto(f));
    dto.generatedAt = explanation.generatedAt;
    return dto;
  }

  static toFactorDto(factor: RecommendationFactor): RecommendationFactorDto {
    const dto = new RecommendationFactorDto();
    dto.name = factor.name;
    dto.value = factor.value;
    dto.weight = factor.weight;
    dto.contribution = factor.contribution;
    dto.description = factor.description;
    return dto;
  }
}
