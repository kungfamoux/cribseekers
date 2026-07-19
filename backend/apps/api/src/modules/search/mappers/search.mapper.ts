import { SearchResult } from '../types/search-result.type';
import { SearchResponseDto } from '../dto/search-response.dto';
import { SearchSuggestion } from '../types/search-result.type';
import { SearchSuggestionDto } from '../dto/search-response.dto';

export class SearchMapper {
  static toResponseDto(entity: SearchResult): SearchResponseDto {
    const dto = new SearchResponseDto();
    dto.id = entity.id;
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
    return dto;
  }

  static toSuggestionDto(entity: SearchSuggestion): SearchSuggestionDto {
    const dto = new SearchSuggestionDto();
    dto.id = entity.id;
    dto.type = entity.type;
    dto.name = entity.name;
    dto.state = entity.state;
    dto.city = entity.city;
    dto.count = entity.count;
    return dto;
  }
}
