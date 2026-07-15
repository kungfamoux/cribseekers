import { PropertyType } from '../entities/property-type.entity';
import { CreateTypeDto, UpdateTypeDto, TypeResponseDto } from '../dto/type.dto';

export class TypeMapper {
  static toEntity(prismaType: any): PropertyType {
    const entity = new PropertyType();
    entity.id = prismaType.id;
    entity.name = prismaType.name;
    entity.description = prismaType.description;
    entity.icon = prismaType.icon;
    entity.isActive = prismaType.isActive;
    entity.sortOrder = prismaType.sortOrder;
    entity.createdAt = prismaType.createdAt;
    entity.updatedAt = prismaType.updatedAt;
    return entity;
  }

  static toResponseDto(entity: PropertyType): TypeResponseDto {
    const dto = new TypeResponseDto();
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

  static toCreateInput(dto: CreateTypeDto): any {
    return {
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
      isActive: dto.isActive !== undefined ? dto.isActive : true,
      sortOrder: dto.sortOrder || 0,
    };
  }

  static toUpdateInput(dto: UpdateTypeDto): any {
    const input: any = {};
    if (dto.name !== undefined) input.name = dto.name;
    if (dto.description !== undefined) input.description = dto.description;
    if (dto.icon !== undefined) input.icon = dto.icon;
    if (dto.isActive !== undefined) input.isActive = dto.isActive;
    if (dto.sortOrder !== undefined) input.sortOrder = dto.sortOrder;
    return input;
  }
}
