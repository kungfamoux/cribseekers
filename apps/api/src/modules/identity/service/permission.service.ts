import { Injectable } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { PermissionRepository } from '../repository/permission.repository';
import { PermissionMapper } from '../mappers/permission.mapper';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionResponseDto } from '../dto/permission-response.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { PermissionNotFoundException } from '../exceptions/permission-not-found.exception';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<PermissionResponseDto> {
    const permission = new Permission();
    permission.name = createPermissionDto.name;
    permission.description = createPermissionDto.description;
    permission.type = createPermissionDto.type;
    permission.resource = createPermissionDto.resource;

    const createdPermission = await this.permissionRepository.create(permission);
    return PermissionMapper.toResponseDto(createdPermission);
  }

  async findAll(paginationDto: PaginationDto): Promise<PermissionResponseDto[]> {
    const result = await this.permissionRepository.findMany(undefined, paginationDto);
    return PermissionMapper.toResponseDtoList(result.data);
  }

  async findOne(id: string): Promise<PermissionResponseDto> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new PermissionNotFoundException(id);
    }
    return PermissionMapper.toResponseDto(permission);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<PermissionResponseDto> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new PermissionNotFoundException(id);
    }

    const updateData: Partial<Permission> = {};
    if (updatePermissionDto.name) updateData.name = updatePermissionDto.name;
    if (updatePermissionDto.description) updateData.description = updatePermissionDto.description;
    if (updatePermissionDto.type) updateData.type = updatePermissionDto.type as any;
    if (updatePermissionDto.resource) updateData.resource = updatePermissionDto.resource;

    const updatedPermission = await this.permissionRepository.update(id, updateData);
    return PermissionMapper.toResponseDto(updatedPermission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new PermissionNotFoundException(id);
    }
    await this.permissionRepository.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.permissionRepository.exists(id);
  }

  async count(): Promise<number> {
    return this.permissionRepository.count();
  }

  async paginate(paginationDto: PaginationDto): Promise<{ data: PermissionResponseDto[]; meta: any }> {
    const result = await this.permissionRepository.paginate(paginationDto);
    return {
      data: PermissionMapper.toResponseDtoList(result.data),
      meta: result.meta,
    };
  }
}
