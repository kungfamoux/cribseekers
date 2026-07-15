import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { RoleController } from './controller/role.controller';
import { PermissionController } from './controller/permission.controller';
import { UserService } from './service/user.service';
import { RoleService } from './service/role.service';
import { PermissionService } from './service/permission.service';
import { UserRepository } from './repository/user.repository';
import { RoleRepository } from './repository/role.repository';
import { PermissionRepository } from './repository/permission.repository';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [
    UserController,
    RoleController,
    PermissionController,
  ],
  providers: [
    UserService,
    RoleService,
    PermissionService,
    UserRepository,
    RoleRepository,
    PermissionRepository,
    PrismaService,
  ],
  exports: [
    UserService,
    RoleService,
    PermissionService,
    UserRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class IdentityModule {}
