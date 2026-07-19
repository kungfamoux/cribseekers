import { Permission as PrismaPermission } from '@prisma/client';
import { Permission } from '../entities/permission.entity';
import { PermissionResponseDto } from '../dto/permission-response.dto';

export class PermissionMapper {
  static toDomain(prismaPermission: PrismaPermission): Permission {
    const permission = new Permission();
    permission.id = prismaPermission.id;
    permission.name = prismaPermission.name;
    permission.description = prismaPermission.description || undefined;
    permission.type = prismaPermission.type;
    permission.resource = prismaPermission.resource;
    permission.createdAt = prismaPermission.createdAt;
    permission.updatedAt = prismaPermission.updatedAt;
    return permission;
  }

  static toResponseDto(permission: Permission): PermissionResponseDto {
    const dto = new PermissionResponseDto();
    dto.id = permission.id;
    dto.name = permission.name;
    dto.description = permission.description;
    dto.type = permission.type;
    dto.resource = permission.resource;
    dto.createdAt = permission.createdAt;
    dto.updatedAt = permission.updatedAt;
    return dto;
  }

  static toDomainList(prismaPermissions: PrismaPermission[]): Permission[] {
    return prismaPermissions.map(permission => this.toDomain(permission));
  }

  static toResponseDtoList(permissions: Permission[]): PermissionResponseDto[] {
    return permissions.map(permission => this.toResponseDto(permission));
  }
}
