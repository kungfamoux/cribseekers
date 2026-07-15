import { Role as PrismaRole } from '@prisma/client';
import { Role } from '../entities/role.entity';
import { RoleResponseDto } from '../dto/role-response.dto';

export class RoleMapper {
  static toDomain(prismaRole: PrismaRole): Role {
    const role = new Role();
    role.id = prismaRole.id;
    role.name = prismaRole.name;
    role.description = prismaRole.description || undefined;
    role.type = prismaRole.type;
    role.isSystem = prismaRole.isSystem;
    role.createdAt = prismaRole.createdAt;
    role.updatedAt = prismaRole.updatedAt;
    return role;
  }

  static toResponseDto(role: Role): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = role.id;
    dto.name = role.name;
    dto.description = role.description;
    dto.type = role.type;
    dto.isSystem = role.isSystem;
    dto.createdAt = role.createdAt;
    dto.updatedAt = role.updatedAt;
    return dto;
  }

  static toDomainList(prismaRoles: PrismaRole[]): Role[] {
    return prismaRoles.map(role => this.toDomain(role));
  }

  static toResponseDtoList(roles: Role[]): RoleResponseDto[] {
    return roles.map(role => this.toResponseDto(role));
  }
}
