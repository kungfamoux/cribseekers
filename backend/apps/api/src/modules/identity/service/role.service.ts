import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../repository/role.repository';
import { RoleMapper } from '../mappers/role.mapper';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleResponseDto } from '../dto/role-response.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { RoleNotFoundException } from '../exceptions/role-not-found.exception';
import { DuplicateRoleException } from '../exceptions/duplicate-role.exception';
import { ForbiddenOperationException } from '../exceptions/forbidden-operation.exception';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    const existingRole = await this.roleRepository.findByName(createRoleDto.name);
    if (existingRole) {
      throw new DuplicateRoleException(createRoleDto.name);
    }

    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    role.type = createRoleDto.type;
    role.isSystem = createRoleDto.isSystem ?? false;

    const createdRole = await this.roleRepository.create(role);
    return RoleMapper.toResponseDto(createdRole);
  }

  async findAll(paginationDto: PaginationDto): Promise<RoleResponseDto[]> {
    const result = await this.roleRepository.findMany(undefined, paginationDto);
    return RoleMapper.toResponseDtoList(result.data);
  }

  async findOne(id: string): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundException(id);
    }
    return RoleMapper.toResponseDto(role);
  }

  async findByName(name: string): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findByName(name);
    if (!role) {
      throw new RoleNotFoundException(name);
    }
    return RoleMapper.toResponseDto(role);
  }

  async findByType(type: string): Promise<RoleResponseDto[]> {
    const roles = await this.roleRepository.findByType(type);
    return RoleMapper.toResponseDtoList(roles);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleResponseDto> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundException(id);
    }

    if (role.isSystem) {
      throw new ForbiddenOperationException('Cannot modify system roles');
    }

    if (updateRoleDto.name) {
      const existingRole = await this.roleRepository.findByName(updateRoleDto.name);
      if (existingRole && existingRole.id !== id) {
        throw new DuplicateRoleException(updateRoleDto.name);
      }
    }

    const updateData: Partial<Role> = {};
    if (updateRoleDto.name) updateData.name = updateRoleDto.name;
    if (updateRoleDto.description) updateData.description = updateRoleDto.description;
    if (updateRoleDto.type) updateData.type = updateRoleDto.type as any;
    if (updateRoleDto.isSystem !== undefined) updateData.isSystem = updateRoleDto.isSystem;

    const updatedRole = await this.roleRepository.update(id, updateData);
    return RoleMapper.toResponseDto(updatedRole);
  }

  async remove(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new RoleNotFoundException(id);
    }

    if (role.isSystem) {
      throw new ForbiddenOperationException('Cannot delete system roles');
    }

    await this.roleRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.roleRepository.exists(id);
  }

  async count(): Promise<number> {
    return this.roleRepository.count();
  }

  async paginate(paginationDto: PaginationDto): Promise<{ data: RoleResponseDto[]; meta: any }> {
    const result = await this.roleRepository.paginate(paginationDto);
    return {
      data: RoleMapper.toResponseDtoList(result.data),
      meta: result.meta,
    };
  }
}
