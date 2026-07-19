import { PropertyCategory } from '../entities/property-category.entity';
import { CreateCategoryDto, UpdateCategoryDto, CategoryResponseDto } from '../dto/category.dto';

export class CategoryMapper {
  static toEntity(prismaCategory: any): PropertyCategory {
    const entity = new PropertyCategory();
    entity.id = prismaCategory.id;
    entity.name = prismaCategory.name;
    entity.description = prismaCategory.description;
    entity.icon = prismaCategory.icon;
    entity.isActive = prismaCategory.isActive;
    entity.sortOrder = prismaCategory.sortOrder;
    entity.createdAt = prismaCategory.createdAt;
    entity.updatedAt = prismaCategory.updatedAt;
    return entity;
  }

  static toResponseDto(entity: PropertyCategory): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.icon = entity.icon;
    dto.isActive = entity.isActive;
    dto.sortOrder = entity.sortOrder;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  static toCreateInput(dto: CreateCategoryDto): any {
    return {
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
      isActive: dto.isActive !== undefined ? dto.isActive : true,
      sortOrder: dto.sortOrder || 0,
    };
  }

  static toUpdateInput(dto: UpdateCategoryDto): any {
    const input: any = {};
    if (dto.name !== undefined) input.name = dto.name;
    if (dto.description !== undefined) input.description = dto.description;
    if (dto.icon !== undefined) input.icon = dto.icon;
    if (dto.isActive !== undefined) input.isActive = dto.isActive;
    if (dto.sortOrder !== undefined) input.sortOrder = dto.sortOrder;
    return input;
  }
}
