import { PropertyPurpose } from '../entities/property-purpose.entity';
import { CreatePurposeDto, UpdatePurposeDto, PurposeResponseDto } from '../dto/purpose.dto';

export class PurposeMapper {
  static toEntity(prismaPurpose: any): PropertyPurpose {
    const entity = new PropertyPurpose();
    entity.id = prismaPurpose.id;
    entity.name = prismaPurpose.name;
    entity.description = prismaPurpose.description;
    entity.isActive = prismaPurpose.isActive;
    entity.sortOrder = prismaPurpose.sortOrder;
    entity.createdAt = prismaPurpose.createdAt;
    entity.updatedAt = prismaPurpose.updatedAt;
    return entity;
  }

  static toResponseDto(entity: PropertyPurpose): PurposeResponseDto {
    const dto = new PurposeResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.isActive = entity.isActive;
    dto.sortOrder = entity.sortOrder;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  static toCreateInput(dto: CreatePurposeDto): any {
    return {
      name: dto.name,
      description: dto.description,
      isActive: dto.isActive !== undefined ? dto.isActive : true,
      sortOrder: dto.sortOrder || 0,
    };
  }

  static toUpdateInput(dto: UpdatePurposeDto): any {
    const input: any = {};
    if (dto.name !== undefined) input.name = dto.name;
    if (dto.description !== undefined) input.description = dto.description;
    if (dto.isActive !== undefined) input.isActive = dto.isActive;
    if (dto.sortOrder !== undefined) input.sortOrder = dto.sortOrder;
    return input;
  }
}
