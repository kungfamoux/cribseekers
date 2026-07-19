import { Property } from '../entities/property.entity';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertySummaryDto } from '../dto/property-summary.dto';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

export class PropertyMapper {
  static toEntity(prismaProperty: any): Property {
    const entity = new Property();
    entity.id = prismaProperty.id;
    entity.title = prismaProperty.title;
    entity.description = prismaProperty.description;
    entity.categoryId = prismaProperty.categoryId;
    entity.typeId = prismaProperty.typeId;
    entity.purposeId = prismaProperty.purposeId;
    entity.listingType = prismaProperty.listingType;
    entity.condition = prismaProperty.condition;
    entity.price = prismaProperty.price;
    entity.currency = prismaProperty.currency;
    entity.pricePeriod = prismaProperty.pricePeriod;
    entity.bedrooms = prismaProperty.bedrooms;
    entity.bathrooms = prismaProperty.bathrooms;
    entity.squareFeet = prismaProperty.squareFeet;
    entity.squareMeters = prismaProperty.squareMeters;
    entity.lotSize = prismaProperty.lotSize;
    entity.yearBuilt = prismaProperty.yearBuilt;
    entity.parkingSpaces = prismaProperty.parkingSpaces;
    entity.floors = prismaProperty.floors;
    entity.locationId = prismaProperty.locationId;
    entity.status = prismaProperty.status;
    entity.visibility = prismaProperty.visibility;
    entity.featured = prismaProperty.featured;
    entity.featuredUntil = prismaProperty.featuredUntil;
    entity.views = prismaProperty.views;
    entity.inquiries = prismaProperty.inquiries;
    entity.publishedAt = prismaProperty.publishedAt;
    entity.expiresAt = prismaProperty.expiresAt;
    entity.ownerId = prismaProperty.ownerId;
    entity.verifiedAt = prismaProperty.verifiedAt;
    entity.verifiedBy = prismaProperty.verifiedBy;
    entity.createdAt = prismaProperty.createdAt;
    entity.updatedAt = prismaProperty.updatedAt;
    entity.deletedAt = prismaProperty.deletedAt;
    entity.createdBy = prismaProperty.createdBy;
    entity.updatedBy = prismaProperty.updatedBy;
    return entity;
  }

  static toResponseDto(entity: Property): PropertyResponseDto {
    const dto = new PropertyResponseDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.categoryId = entity.categoryId;
    dto.typeId = entity.typeId;
    dto.purposeId = entity.purposeId;
    dto.listingType = entity.listingType;
    dto.condition = entity.condition;
    dto.price = entity.price;
    dto.currency = entity.currency;
    dto.pricePeriod = entity.pricePeriod;
    dto.bedrooms = entity.bedrooms;
    dto.bathrooms = entity.bathrooms;
    dto.squareFeet = entity.squareFeet;
    dto.squareMeters = entity.squareMeters;
    dto.lotSize = entity.lotSize;
    dto.yearBuilt = entity.yearBuilt;
    dto.parkingSpaces = entity.parkingSpaces;
    dto.floors = entity.floors;
    dto.locationId = entity.locationId;
    dto.status = entity.status;
    dto.visibility = entity.visibility;
    dto.featured = entity.featured;
    dto.featuredUntil = entity.featuredUntil;
    dto.views = entity.views;
    dto.inquiries = entity.inquiries;
    dto.publishedAt = entity.publishedAt;
    dto.expiresAt = entity.expiresAt;
    dto.ownerId = entity.ownerId;
    dto.verifiedAt = entity.verifiedAt;
    dto.verifiedBy = entity.verifiedBy;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.deletedAt = entity.deletedAt;
    dto.createdBy = entity.createdBy;
    dto.updatedBy = entity.updatedBy;
    return dto;
  }

  static toSummaryDto(entity: Property): PropertySummaryDto {
    const dto = new PropertySummaryDto();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.categoryId = entity.categoryId;
    dto.typeId = entity.typeId;
    dto.purposeId = entity.purposeId;
    dto.listingType = entity.listingType;
    dto.price = entity.price;
    dto.currency = entity.currency;
    dto.pricePeriod = entity.pricePeriod;
    dto.bedrooms = entity.bedrooms;
    dto.bathrooms = entity.bathrooms;
    dto.locationId = entity.locationId;
    dto.status = entity.status;
    dto.visibility = entity.visibility;
    dto.featured = entity.featured;
    dto.views = entity.views;
    dto.inquiries = entity.inquiries;
    dto.publishedAt = entity.publishedAt;
    dto.ownerId = entity.ownerId;
    dto.createdAt = entity.createdAt;
    return dto;
  }

  static toCreateInput(dto: CreatePropertyDto): any {
    return {
      title: dto.title,
      description: dto.description,
      categoryId: dto.categoryId,
      typeId: dto.typeId,
      purposeId: dto.purposeId,
      listingType: dto.listingType,
      condition: dto.condition,
      price: dto.price,
      currency: dto.currency || 'NGN',
      pricePeriod: dto.pricePeriod,
      bedrooms: dto.bedrooms,
      bathrooms: dto.bathrooms,
      squareFeet: dto.squareFeet,
      squareMeters: dto.squareMeters,
      lotSize: dto.lotSize,
      yearBuilt: dto.yearBuilt,
      parkingSpaces: dto.parkingSpaces,
      floors: dto.floors,
      locationId: dto.locationId,
      status: dto.status,
      visibility: dto.visibility,
      featuredUntil: dto.featuredUntil ? new Date(dto.featuredUntil) : undefined,
      expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      ownerId: dto.ownerId,
    };
  }

  static toUpdateInput(dto: UpdatePropertyDto): any {
    const input: any = {};
    if (dto.title !== undefined) input.title = dto.title;
    if (dto.description !== undefined) input.description = dto.description;
    if (dto.categoryId !== undefined) input.categoryId = dto.categoryId;
    if (dto.typeId !== undefined) input.typeId = dto.typeId;
    if (dto.purposeId !== undefined) input.purposeId = dto.purposeId;
    if (dto.listingType !== undefined) input.listingType = dto.listingType;
    if (dto.condition !== undefined) input.condition = dto.condition;
    if (dto.price !== undefined) input.price = dto.price;
    if (dto.currency !== undefined) input.currency = dto.currency;
    if (dto.pricePeriod !== undefined) input.pricePeriod = dto.pricePeriod;
    if (dto.bedrooms !== undefined) input.bedrooms = dto.bedrooms;
    if (dto.bathrooms !== undefined) input.bathrooms = dto.bathrooms;
    if (dto.squareFeet !== undefined) input.squareFeet = dto.squareFeet;
    if (dto.squareMeters !== undefined) input.squareMeters = dto.squareMeters;
    if (dto.lotSize !== undefined) input.lotSize = dto.lotSize;
    if (dto.yearBuilt !== undefined) input.yearBuilt = dto.yearBuilt;
    if (dto.parkingSpaces !== undefined) input.parkingSpaces = dto.parkingSpaces;
    if (dto.floors !== undefined) input.floors = dto.floors;
    if (dto.locationId !== undefined) input.locationId = dto.locationId;
    if (dto.status !== undefined) input.status = dto.status;
    if (dto.visibility !== undefined) input.visibility = dto.visibility;
    if (dto.featured !== undefined) input.featured = dto.featured;
    if (dto.featuredUntil !== undefined) input.featuredUntil = new Date(dto.featuredUntil);
    if (dto.expiresAt !== undefined) input.expiresAt = new Date(dto.expiresAt);
    if (dto.verifiedAt !== undefined) input.verifiedAt = new Date(dto.verifiedAt);
    if (dto.verifiedBy !== undefined) input.verifiedBy = dto.verifiedBy;
    return input;
  }
}
